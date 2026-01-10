import Elysia from "elysia";
import { resourceController } from "../../modules/resource/resource.controller";

export const v1Routes = new Elysia({ prefix: '/v1' })
    .use(resourceController)