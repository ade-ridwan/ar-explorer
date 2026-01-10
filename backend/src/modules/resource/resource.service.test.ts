import { describe, it, expect, beforeEach, spyOn } from 'bun:test';
import { Elysia } from 'elysia';
import { resourceController } from './resource.controller';
import { db } from '../../db';

const app = new Elysia().group('/v1', (app) => app.use(resourceController))

// 1. Setup Mock Data
const MOCK_FOLDERS = [
  { id: 101, name: 'Sub Folder A', parentId: 1, hasChildren: false },
  { id: 102, name: 'Sub Folder B', parentId: 1, hasChildren: true }
]

describe('Resource Controller', () => {
  // Mocking Database: Kita "membajak" fungsi select Drizzle
  // agar tidak benar-benar memanggil database asli.
  beforeEach(() => {
    spyOn(db, 'select').mockImplementation(() => {
      return {
        from: () => ({
          where: () => {
            return Promise.resolve(MOCK_FOLDERS)
          }
        })
      } as any
    })
  })

  it('[GET] v1/resources/:id/files should response status 200', async () => {
    const response = await app.handle(
      new Request('http://localhost/v1/resources/123/files')
    );

    expect(response.status).toBe(200)

    const body = await response.json()
    expect(body.status).toBe('success')
    expect(body.data).toBeArray()
    expect(body.data.length).toBe(2)
    expect(body.data[0].name).toBe('Sub Folder A')
  });

  it('[GET] v1/resources/:id/files - send the response as JSON', async () => {
    const response = await app.handle(
      new Request('http://localhost/v1/resources/123/files')
    )

    // expect the response to be JSON
    expect(response.headers.get('content-type')).toContain('application/json')
  })
});