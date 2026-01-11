import { ilike, isNull } from "drizzle-orm";
import { db } from "../../db";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { files } from "../../db/schema";
export const resourceRepository = {
    
    // get all root folders
    getRootResources: async () => {
        return await db.query.files.findMany({
            where: (files, { eq }) => eq(files.type, 'folder') && isNull(files.parentId),
            with: {
                children: true,
            }

        });
    },

    // get all children folder by Parent ID
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

    // search folder by name
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
}