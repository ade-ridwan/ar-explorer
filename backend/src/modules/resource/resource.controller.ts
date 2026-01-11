import { Elysia, t } from "elysia";
import { resourceService } from "./resource.service";

export const resourceController = new Elysia({ prefix: '/resources' })

// get all root folders
.get('/', async () => {
    const data = await resourceService.getRootResources();
    return { status: 'success', data: data };
})

// get all children folders by parent id
.get('/:id/children', async ({ params, set }) => {
    const data = await resourceService.getChildrenResources(params.id);
    if (!data) {
        set.status = 404;
        return { status: 'error', message: 'File not found' };
    }
    return { status: 'success', data: data };
}, {
    params: t.Object({ id: t.String() })
})

// search folder by name
.get('/search', async ({ query: { q } }) => {
    if (!q || q.length < 2) return { data: [] }; // Minimal 2 karakter
    const results = await resourceService.getSearchByName(q);
    return { status: 'success', data: results };
}, {
    query: t.Object({ q: t.String() })
})