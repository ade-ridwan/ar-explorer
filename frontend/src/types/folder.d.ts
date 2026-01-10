import type { File } from "./file";

export interface Folder {
    id: string;
    name: string;
    parentId: string | null;
    subfolders?: Folder[] | [];
    files?: File[] | [];
    createdAt: Date;
    updatedAt: Date;
}