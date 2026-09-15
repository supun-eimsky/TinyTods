import { query, execute, getPool } from "@/lib/db";
import { CartItem, CreateOrderInput, OrderItemRecord, OrderRecord, OrderStatus } from "@/types";
import {
  getCartSubtotal,
  getCartOriginalTotal,
  getCartDiscount,
  getShippingCost,
  getCartTotal,
} from "@/lib/cart-helpers";

interface OrderRow {
  id: number;
  order_number: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string | null;
  notes: string | null;
  currency: string;
  item_total: string | number;
  discount_total: string | number;
  shipping_total: string | number;
  grand_total: string | number;
  payment_method: string;
  status: OrderStatus;
  created_at: string;
}

interface OrderItemRow {
  id: number;
  order_id: number;
  product_id: number | null;
  name: string;
  image: string;
  price: string | number;
  old_price: string | number | null;
  quantity: number;
  selected_options: Record<string, string> | string | null;
}

function parseOptions(value: OrderItemRow["selected_options"]): Record<string, string> | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return undefined;
    }
  }
  return value;
}

function mapItemRow(row: OrderItemRow): OrderItemRecord {
  return {
    id: row.id,
    productId: row.product_id,
    name: row.name,
    image: row.image,
    price: Number(row.price),
    oldPrice: row.old_price === null ? undefined : Number(row.old_price),
    quantity: row.quantity,
    selectedOptions: parseOptions(row.selected_options),
  };
}

function mapOrderRow(row: OrderRow, items: OrderItemRecord[]): OrderRecord {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    city: row.city,
    postalCode: row.postal_code ?? undefined,
    notes: row.notes ?? undefined,
    currency: row.currency,
    itemTotal: Number(row.item_total),
    discountTotal: Number(row.discount_total),
    shippingTotal: Number(row.shipping_total),
    grandTotal: Number(row.grand_total),
    paymentMethod: row.payment_method,
    status: row.status,
    createdAt: row.created_at,
    items,
  };
}

function generateOrderNumber(): string {
  return `TT-${Date.now().toString().slice(-8)}`;
}

async function fetchItemsForOrders(orderIds: number[]): Promise<Map<number, OrderItemRecord[]>> {
  const map = new Map<number, OrderItemRecord[]>();
  if (orderIds.length === 0) return map;

  const placeholders = orderIds.map(() => "?").join(", ");
  const rows = await query<OrderItemRow>(
    `SELECT * FROM order_items WHERE order_id IN (${placeholders})`,
    orderIds
  );
  for (const row of rows) {
    const list = map.get(row.order_id) ?? [];
    list.push(mapItemRow(row));
    map.set(row.order_id, list);
  }
  return map;
}

export const OrderService = {
  /**
   * Creates an order and its line items in a single transaction, using
   * the same cart-total math the storefront's cart/checkout pages
   * already show — so what the shopper sees before placing the order is
   * exactly what gets stored.
   */
  async create(input: CreateOrderInput): Promise<OrderRecord> {
    const items: CartItem[] = input.items;
    if (items.length === 0) {
      throw new Error("Cannot place an order with an empty cart.");
    }

    const currency = items[0].currency;
    const itemTotal = getCartOriginalTotal(items);
    const discountTotal = getCartDiscount(items);
    const shippingTotal = getShippingCost(items);
    const grandTotal = getCartTotal(items);
    const orderNumber = generateOrderNumber();

    const pool = getPool();
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [orderResult] = await connection.execute(
        `INSERT INTO orders
          (order_number, customer_name, email, phone, address, city, postal_code, notes, currency, item_total, discount_total, shipping_total, grand_total, payment_method, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'cod', 'pending')`,
        [
          orderNumber,
          input.customerName,
          input.email,
          input.phone,
          input.address,
          input.city,
          input.postalCode ?? null,
          input.notes ?? null,
          currency,
          itemTotal,
          discountTotal,
          shippingTotal,
          grandTotal,
        ]
      );
      // mysql2's execute() typing needs a cast here since it doesn't know
      // this particular query returns a ResultSetHeader.
      const orderId = (orderResult as unknown as { insertId: number }).insertId;

      for (const item of items) {
        await connection.execute(
          `INSERT INTO order_items (order_id, product_id, name, image, price, old_price, quantity, selected_options)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            orderId,
            Number(item.productId) || null,
            item.name,
            item.image,
            item.price,
            item.oldPrice ?? null,
            item.quantity,
            item.selectedOptions ? JSON.stringify(item.selectedOptions) : null,
          ]
        );
      }

      await connection.commit();

      const created = await this.getByOrderNumber(orderNumber);
      if (!created) throw new Error("Failed to load newly created order.");
      return created;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async list(filters?: { status?: OrderStatus }): Promise<OrderRecord[]> {
    const where = filters?.status ? "WHERE status = ?" : "";
    const params = filters?.status ? [filters.status] : [];
    const rows = await query<OrderRow>(
      `SELECT * FROM orders ${where} ORDER BY created_at DESC`,
      params
    );
    const itemsByOrder = await fetchItemsForOrders(rows.map((r) => r.id));
    return rows.map((row) => mapOrderRow(row, itemsByOrder.get(row.id) ?? []));
  },

  async getByOrderNumber(orderNumber: string): Promise<OrderRecord | null> {
    const rows = await query<OrderRow>("SELECT * FROM orders WHERE order_number = ? LIMIT 1", [
      orderNumber,
    ]);
    if (!rows[0]) return null;
    const itemsByOrder = await fetchItemsForOrders([rows[0].id]);
    return mapOrderRow(rows[0], itemsByOrder.get(rows[0].id) ?? []);
  },

  async getById(id: number): Promise<OrderRecord | null> {
    const rows = await query<OrderRow>("SELECT * FROM orders WHERE id = ? LIMIT 1", [id]);
    if (!rows[0]) return null;
    const itemsByOrder = await fetchItemsForOrders([rows[0].id]);
    return mapOrderRow(rows[0], itemsByOrder.get(rows[0].id) ?? []);
  },

  async updateStatus(id: number, status: OrderStatus): Promise<OrderRecord> {
    await execute("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
    const updated = await this.getById(id);
    if (!updated) throw new Error("Order not found after status update.");
    return updated;
  },

  async getStats(): Promise<{
    totalOrders: number;
    pendingOrders: number;
    totalRevenue: number;
    totalProducts: number;
  }> {
    const [orderStats] = await query<{ total_orders: number; pending_orders: number; revenue: number }>(
      `SELECT
         COUNT(*) AS total_orders,
         SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_orders,
         COALESCE(SUM(CASE WHEN status != 'cancelled' THEN grand_total ELSE 0 END), 0) AS revenue
       FROM orders`
    );
    const [productStats] = await query<{ total: number }>("SELECT COUNT(*) AS total FROM products");

    return {
      totalOrders: Number(orderStats?.total_orders ?? 0),
      pendingOrders: Number(orderStats?.pending_orders ?? 0),
      totalRevenue: Number(orderStats?.revenue ?? 0),
      totalProducts: Number(productStats?.total ?? 0),
    };
  },
};
