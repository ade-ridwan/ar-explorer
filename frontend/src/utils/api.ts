import { treaty } from '@elysiajs/eden'

// get type app from backend
import type { App } from '../../../backend/src/index'

// Inisialisasi client dengan URL backend
// @ts-expect-error
export const client = treaty<App>('http://localhost:3000')