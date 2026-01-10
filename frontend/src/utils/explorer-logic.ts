import type { File } from '../types/file'

export const findPathFunc = (folders: File[], targetId: string, path: File[] = []): File[] | null => {
  for (const folder of folders) {
    // Tambahkan folder saat ini ke jejak
    const currentPath = [...path, folder]

    // Jika ID cocok, kita temukan jalurnya!
    if (folder.id === targetId) return currentPath

    // Jika punya anak, cari di dalamnya secara rekursif
    if (folder.children) {
      const found = findPathFunc(folder.children, targetId, currentPath)
      if (found) return found
    }
  }
  return null
}