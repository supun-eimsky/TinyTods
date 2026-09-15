import { randomUUID } from "crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const EXTENSIONS: Record<string, string> = {
  "image/avif": ".avif",
  "image/gif": ".gif",
  "image/jpeg": ".jpeg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("images");

    if (files.length === 0 || !files.every((file): file is File => file instanceof File)) {
      return NextResponse.json({ error: "Select at least one image." }, { status: 400 });
    }

    for (const file of files) {
      if (!EXTENSIONS[file.type]) {
        return NextResponse.json(
          { error: "Only JPEG, PNG, GIF, WebP, and AVIF images are supported." },
          { status: 400 }
        );
      }
      if (file.size === 0 || file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Each image must be between 1 byte and 10 MB." },
          { status: 400 }
        );
      }
    }

    const { env } = getCloudflareContext();
    const images = env.IMAGES ?? env.tinytods_images;
    if (!images) {
      throw new Error("The IMAGES R2 bucket is not configured.");
    }

    const paths = await Promise.all(
      files.map(async (file) => {
        const filename = `${randomUUID()}${EXTENSIONS[file.type]}`;
        await images.put(filename, await file.arrayBuffer(), {
          httpMetadata: { contentType: file.type },
        });
        return `/api/uploads/images/${filename}`;
      })
    );

    return NextResponse.json({ paths });
  } catch (error) {
    console.error("Failed to upload product images:", error);
    return NextResponse.json({ error: "Failed to upload images." }, { status: 500 });
  }
}