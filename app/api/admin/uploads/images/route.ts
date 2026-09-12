import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
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

    const imageDirectory = path.join(process.cwd(), "public", "images");
    await mkdir(imageDirectory, { recursive: true });

    const paths = await Promise.all(
      files.map(async (file) => {
        const filename = `${randomUUID()}${EXTENSIONS[file.type]}`;
        await writeFile(path.join(imageDirectory, filename), Buffer.from(await file.arrayBuffer()));
        return `/images/${filename}`;
      })
    );

    return NextResponse.json({ paths });
  } catch (error) {
    console.error("Failed to upload product images:", error);
    return NextResponse.json({ error: "Failed to upload images." }, { status: 500 });
  }
}