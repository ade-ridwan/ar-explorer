import {t} from 'elysia'

export const resourceSchema = t.Object({
    id: t.String(),
    name: t.String(),
    type: t.String(),
    url: t.String(),
    metadata: t.Object({
        size: t.String(),
        width: t.String(),
        height: t.String(),
    }),
    parentId: t.String().optional(),
})
