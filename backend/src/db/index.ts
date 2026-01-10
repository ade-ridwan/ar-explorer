import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Bun secara otomatis membaca process.env.DATABASE_URL
const queryClient = postgres(process.env.DATABASE_URL!);

export const db = drizzle(queryClient, { schema, logger: false });