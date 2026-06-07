import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const noteCoversDirectory = path.join(process.cwd(), "public", "images", "notes");

const webpOptions = {
  effort: 6,
  quality: 82,
};

async function optimizeNoteCovers() {
  await fs.mkdir(noteCoversDirectory, { recursive: true });

  const sourceFiles = await fs.readdir(noteCoversDirectory, { withFileTypes: true });
  const pngFiles = sourceFiles.filter(
    (file) => file.isFile() && file.name.endsWith(".png"),
  );

  await Promise.all(
    pngFiles.map(async (file) => {
      const sourcePath = path.join(noteCoversDirectory, file.name);
      const outputPath = path.join(
        noteCoversDirectory,
        file.name.replace(/\.png$/u, ".webp"),
      );

      await sharp(sourcePath).webp(webpOptions).toFile(outputPath);
    }),
  );

  console.log(`Optimized ${pngFiles.length} note cover(s) to WebP.`);
}

optimizeNoteCovers().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
