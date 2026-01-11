import { ilike, isNull } from "drizzle-orm";
import { db } from "../../db";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { files } from "../../db/schema";
export const resourceRepository = {
    getRootResources: async () => {
        return await db.query.files.findMany({
            where: (files, { eq }) => eq(files.type, 'folder') && isNull(files.parentId),
            with: {
                children: true,
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
            hasChildren: sql<boolean>`
                EXISTS(SELECT 1 FROM ${files} AS f 
                WHERE f.parent_id = ${files}.${files.id}
                AND f.type = 'folder'
            )`
        })
            .from(files)
            .where(eq(files.parentId, parentId))

        return result;
    },
    search: async (keyword: string) => {
        return await db.query.files.findMany({
            columns: {
                id: true,
                name: true,
                parentId: true,
                type: true,
                metadata: true,
            },
            where: (files, { ilike }) => ilike(files.name, `%${keyword}%`),
            with: {
                parent: true
            },
            limit: 10
        })
    },
    getAncestors: async (folderId: string) => {
        const result = await db.execute(sql`
            WITH RECURSIVE folder_path AS (
                SELECT id, name, parent_id FROM files WHERE id = ${folderId}
                UNION ALL
                SELECT f.id, f.name, f.parent_id
                FROM files f
                JOIN folder_path fp ON f.id = fp.parent_id
            )
            SELECT * FROM folder_path;
            `);
        return result;
    }
}