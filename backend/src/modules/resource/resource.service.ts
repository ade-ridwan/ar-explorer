import { isNull } from "drizzle-orm";
import { db } from "../../db";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { files } from "../../db/schema";
export const resourceService = {
    getAllResources: async () => {
        return await db.query.files.findMany({
            where: (files, { eq }) => eq(files.type, 'folder') && isNull(files.parentId),
            with: {
                children: true,
                parent: true
            }

        });
    },
    getChildrenResources: async (parentId: string) => {
        const result = await db.select({
            id: files.id,
            name: files.name,
            parentId: files.parentId,
            type: files.type,
            url: files.url,
            metadata: files.metadata,
            // Logika: Jika hitungan subquery > 0, maka true
            hasChildren: sql<boolean>`
                EXISTS(SELECT 1 FROM ${files} AS f 
                WHERE f.parent_id = ${files}.${files.id}
            )`
        })
            .from(files)
            .where(eq(files.parentId, parentId))

        return result;
    },
    getResourcesByFolderName: async (folderName: string) => {

        return await db.query.files.findFirst({
            where: (files, { eq }) => isNull(files.parentId),
            with: {
                children: true
            }
        });
    },

}