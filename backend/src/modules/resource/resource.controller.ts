import { Elysia } from "elysia";
import { resourceService } from "./resource.service";

export const resourceController = new Elysia({ prefix: '/resources' })
    .get('/', async () => {
        const data = await resourceService.getAllResources();
        return { status: 'success', data: data };
    })
    .get('/files/:id', async ({ params, set }) => {
        const data = await resourceService.getResourceById(params.id);
        if (!data) {
            set.status = 404;
            return { status: 'error', message: 'File not found' };
        }
        return { status: 'success', data: data };
    })