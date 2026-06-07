import fs from "node:fs/promises";
import path from "node:path";

const exportedNoteCoversDirectory = path.join(
  process.cwd(),
  "out",
  "images",
  "notes",
);

async function pruneExportedNoteCoverPngs() {
  try {
    const entries = await fs.readdir(exportedNoteCoversDirectory, {
      withFileTypes: true,
    });
    const pngFiles = entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".png"),
    );

    await Promise.all(
      pngFiles.map(async (file) => {
        const pngPath = path.join(exportedNoteCoversDirectory, file.name);
        const webpPath = pngPath.replace(/\.png$/u, ".webp");

        try {
          await fs.access(webpPath);
          await fs.rm(pngPath, { force: true });
        } catch {
          // Keep the PNG if the optimized asset is missing.
        }
      }),
    );
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return;
    }

    throw error;
  }
}

pruneExportedNoteCoverPngs().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
