import { db } from ".";
import { files } from "./schema";

async function seed() {
  console.log("Start seeding...");

  try {
    // clear all data
    await db.delete(files);
    console.log("Database cleared.");

    // create Root folders
    console.log("Creating root folders...");
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

    const [videosFolder] = await db.insert(files).values({
      name: "Videos",
      parentId: null,
      type: "folder",
    }).returning();

    const [downloadsFolder] = await db.insert(files).values({
      name: "Downloads",
      parentId: null,
      type: "folder",
    }).returning();

    // create sub-folders
    console.log("Creating sub-folders...");

    // Documents sub-folders
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

    // Music sub-folders
    const [rockFolder] = await db.insert(files).values({
      name: "Rock",
      parentId: musicFolder.id,
      type: "folder",
    }).returning();

    const [popFolder] = await db.insert(files).values({
      name: "Pop",
      parentId: musicFolder.id,
      type: "folder",
    }).returning();

    // Pictures sub-folders
    const [vacationFolder] = await db.insert(files).values({
      name: "Vacation 2023",
      parentId: picsFolder.id,
      type: "folder",
    }).returning();

    const [screenshotsFolder] = await db.insert(files).values({
      name: "Screenshots",
      parentId: picsFolder.id,
      type: "folder",
    }).returning();

    // Projects sub-folders
    const [webDesignFolder] = await db.insert(files).values({
      name: "Web Design",
      parentId: projectsFolder.id,
      type: "folder",
    }).returning();
    
    const [backendFolder] = await db.insert(files).values({
      name: "Backend API",
      parentId: projectsFolder.id,
      type: "folder",
    }).returning();

    // create files
    console.log("Creating files...");
    await db.insert(files).values([
      // Web Design files
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
        name: "style.css",
        url: "https://storage.com/files/style.css",
        type: "file",
        metadata: {
          size: 512,
          mime_type: "text/css",
          extension: "css",
        },
        parentId: webDesignFolder.id,
      },
      // Backend files
      {
        name: "server.ts",
        url: "https://storage.com/files/server.ts",
        type: "file",
        metadata: {
          size: 2048,
          mime_type: "application/typescript",
          extension: "ts",
        },
        parentId: backendFolder.id,
      },
      // Documents files
      {
        name: "Resume.pdf",
        url: "https://storage.com/files/Resume.pdf",
        type: "file",
        metadata: {
          size: 10240,
          mime_type: "application/pdf",
          extension: "pdf",
        },
        parentId: docsFolder.id,
      },
      {
        name: "Notes.txt",
        url: "https://storage.com/files/Notes.txt",
        type: "file",
        metadata: {
          size: 128,
          mime_type: "text/plain",
          extension: "txt",
        },
        parentId: docsFolder.id,
      },
      // Picture files
      {
        name: "Beach.jpg",
        url: "https://storage.com/files/Beach.jpg",
        type: "file",
        metadata: {
          size: 2048000,
          mime_type: "image/jpeg",
          extension: "jpg",
        },
        parentId: vacationFolder.id,
      },
      {
        name: "Mountain.png",
        url: "https://storage.com/files/Mountain.png",
        type: "file",
        metadata: {
          size: 3048000,
          mime_type: "image/png",
          extension: "png",
        },
        parentId: vacationFolder.id,
      },
      {
        name: "App.png",
        url: "https://storage.com/files/App.png",
        type: "file",
        metadata: {
          size: 548000,
          mime_type: "image/png",
          extension: "png",
        },
        parentId: screenshotsFolder.id,
      },
      // Music files
      {
        name: "Bohemian Rhapsody.mp3",
        url: "https://storage.com/files/Bohemian Rhapsody.mp3",
        type: "file",
        metadata: {
          size: 8048000,
          mime_type: "audio/mpeg",
          extension: "mp3",
        },
        parentId: rockFolder.id,
      },
      {
        name: "Shape of You.mp3",
        url: "https://storage.com/files/Shape of You.mp3",
        type: "file",
        metadata: {
          size: 7048000,
          mime_type: "audio/mpeg",
          extension: "mp3",
        },
        parentId: popFolder.id,
      },
      // Video files
      {
        name: "Tutorial.mp4",
        url: "https://storage.com/files/Tutorial.mp4",
        type: "file",
        metadata: {
          size: 150048000,
          mime_type: "video/mp4",
          extension: "mp4",
        },
        parentId: videosFolder.id,
      },
      // Download files
      {
        name: "installer.dmg",
        url: "https://storage.com/files/installer.dmg",
        type: "file",
        metadata: {
          size: 100048000,
          mime_type: "application/x-apple-diskimage",
          extension: "dmg",
        },
        parentId: downloadsFolder.id,
      },
      {
        name: "archive.zip",
        url: "https://storage.com/files/archive.zip",
        type: "file",
        metadata: {
          size: 5048000,
          mime_type: "application/zip",
          extension: "zip",
        },
        parentId: downloadsFolder.id,
      },
    ]);

    console.log("Seeding completed");
  } catch (error) {
    console.error("failed to seed:", error);
  } finally {
    process.exit();
  }
}

seed();