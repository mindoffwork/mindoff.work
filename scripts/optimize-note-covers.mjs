import fs from "node:fs/promises";
import path from "node:path";

const noteCoversDirectory = path.join(process.cwd(), "public", "images", "notes");

const webpOptions = {
  effort: 6,
  quality: 82,
};

async function loadSharp() {
  try {
    const module = await import("sharp");
    return module.default;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown sharp loading error.";

    console.warn(
      `Skipping note-cover optimization because sharp is unavailable: ${message}`,
    );

    return null;
  }
}

async function optimizeNoteCovers() {
  await fs.mkdir(noteCoversDirectory, { recursive: true });

  const sourceFiles = await fs.readdir(noteCoversDirectory, { withFileTypes: true });
  const pngFiles = sourceFiles.filter(
    (file) => file.isFile() && file.name.endsWith(".png"),
  );

  if (pngFiles.length === 0) {
    console.log("Optimized 0 note cover(s) to WebP.");
    return;
  }

  const sharp = await loadSharp();

  if (!sharp) {
    return;
  }

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
