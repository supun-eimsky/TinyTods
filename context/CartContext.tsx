"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { CartItem, Product } from "@/types";
import { buildLineId } from "@/lib/cart-helpers";

const STORAGE_KEY = "tinytods-cart";

interface CartContextValue {
  items: CartItem[];
  isLoaded: boolean;
  addItem: (product: Product, quantity: number, selectedOptions?: Record<string, string>) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  // Avoids briefly showing "cart is empty" before localStorage has been
  // read on first client render (and avoids a server/client mismatch,
  // since the server has no localStorage to read from at all).
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // Corrupted or inaccessible storage — start with an empty cart
      // rather than breaking the page.
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable (e.g. private browsing) — the cart
      // still works for the current session, it just won't persist.
    }
  }, [items, isLoaded]);

  function addItem(product: Product, quantity: number, selectedOptions?: Record<string, string>) {
    const lineId = buildLineId(product.id, selectedOptions);

    setItems((prev) => {
      const existing = prev.find((item) => item.lineId === lineId);
      if (existing) {
        return prev.map((item) =>
          item.lineId === lineId
            ? { ...item, quantity: Math.min(item.maxQuantity, item.quantity + quantity) }
            : item
        );
      }

      const newItem: CartItem = {
        lineId,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        price: product.price,
        oldPrice: product.oldPrice,
        currency: product.currency,
        quantity: Math.min(product.stock, quantity),
        selectedOptions,
        maxQuantity: product.stock,
      };
      return [...prev, newItem];
    });
  }

  function removeItem(lineId: string) {
    setItems((prev) => prev.filter((item) => item.lineId !== lineId));
  }

  function updateQuantity(lineId: string, quantity: number) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.lineId === lineId
            ? { ...item, quantity: Math.max(1, Math.min(item.maxQuantity, quantity)) }
            : item
        )
        // Dropping to 0 via the stepper's min button removes the line
        // entirely rather than leaving a stuck "1" behind.
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const value = useMemo(
    () => ({ items, isLoaded, addItem, removeItem, updateQuantity, clearCart }),
    [items, isLoaded]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
