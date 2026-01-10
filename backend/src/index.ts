import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { v1Routes } from "./routes/v1";
import { db } from "./db";

const app = new Elysia()
  .use(cors())
  .decorate('db', db)
  .use(v1Routes)
  .listen(process.env.PORT || 3000)

console.log(
  `Backend is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app

