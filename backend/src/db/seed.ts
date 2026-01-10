import { db } from ".";
import { files } from "./schema";

async function seed() {
  console.log("🌱 Memulai proses seeding...");

  try {
    // 1. Bersihkan data lama (Opsional - Hati-hati di produksi!)
    // Karena ada cascade delete, menghapus folder root akan menghapus semuanya
    await db.delete(files);
    console.log("🧹 Database dibersihkan.");

    // 2. Buat Folder Root
    console.log("📂 Membuat folder root...");
    const [docsFolder] = await db.insert(files).values({
      name: "Documents",
      parentId: null,
      type: "folder",
    }).returning();

    const [picsFolder] = await db.insert(files).values({
      name: "Pictures",
      parentId: null,
      type: "folder",
    }).returning();

    const [musicFolder] = await db.insert(files).values({
      name: "Music",
      parentId: null,
      type: "folder",
    }).returning();

    // 3. Buat Sub-folder di dalam Documents
    console.log("📁 Membuat sub-folder...");
    const [projectsFolder] = await db.insert(files).values({
      name: "Projects",
      parentId: docsFolder.id,
      type: "folder",
    }).returning();

    const [workFolder] = await db.insert(files).values({
      name: "Work",
      parentId: docsFolder.id,
      type: "folder",
    }).returning();

    // 4. Buat Nested Folder (Folder di dalam Folder)
    const [webDesignFolder] = await db.insert(files).values({
      name: "Web Design",
      parentId: projectsFolder.id,
      type: "folder",
    }).returning();

    // 5. Buat File di dalam Folder tertentu
    console.log("📄 Membuat file...");
    await db.insert(files).values([
      {
        name: "index.html",
        url: "https://storage.com/files/index.html",
        type: "file",
        metadata: {
            size: 1024,
            mime_type: "text/html",
            extension: "html",
        },
        parentId: webDesignFolder.id,
      },
      {
        name: "Sekolah.pdf",
        url: "https://storage.com/files/Sekolah.pdf",
        type: "file",
        metadata: {
            size: 2048,
            mime_type: "application/pdf",
            extension: "pdf",
        },
        parentId: docsFolder.id,
      },
      {
        name: "Gambar Ikan.jpg",
        url: "https://storage.com/files/Gambar Ikan.jpg",
        type: "file",
        metadata: {
            size: 2048,
            mime_type: "image/jpeg",
            extension: "jpg",
        },
        parentId: picsFolder.id,
      },
    ]);

    console.log("✅ Seeding selesai dengan sukses!");
  } catch (error) {
    console.error("❌ Gagal melakukan seeding:", error);
  } finally {
    process.exit();
  }
}

seed();