import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const ordersFile = path.join(process.cwd(), "data", "orders.json");

export async function POST(request: Request) {
  try {
    const order = await request.json();
    const orders = JSON.parse(await fs.readFile(ordersFile, "utf8")) as unknown[];

    orders.push({ ...order, savedAt: new Date().toISOString() });
    await fs.writeFile(ordersFile, `${JSON.stringify(orders, null, 2)}\n`, "utf8");

    return NextResponse.json({ saved: true });
  } catch {
    return NextResponse.json({ saved: false, error: "Unable to save order" }, { status: 500 });
  }
}