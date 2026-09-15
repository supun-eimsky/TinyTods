import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  if (!/^[a-zA-Z0-9-]+\.(avif|gif|jpeg|png|webp)$/.test(key)) {
    return NextResponse.json({ error: "Invalid image key." }, { status: 400 });
  }

  try {
    const { env } = getCloudflareContext();
    const images = env.IMAGES ?? env.tinytods_images;
    if (!images) return new NextResponse("Image storage is not configured", { status: 503 });

    const image = await images.get(key);
    if (!image) return new NextResponse("Not found", { status: 404 });

    const headers = new Headers();
    image.writeHttpMetadata(headers);
    headers.set("etag", image.httpEtag);
    headers.set("cache-control", "public, max-age=31536000, immutable");
    return new NextResponse(image.body, { headers });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Failed to load product image", { key, message, error });
    return NextResponse.json({ error: "Failed to load image." }, { status: 500 });
  }
}