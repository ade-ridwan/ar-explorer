export interface File {
    id: string;
    name: string;
    type: 'folder' | 'file' | null;
    url?: string;
    metadata?: {
        size: number;
        mime_type: string;
        extension: string;
    };
    children?: File[];
    parent?: File;
    parentId?: string;
    isLoaded?: boolean;
    isOpen?: boolean;
    isLoading?: boolean;
    hasChildren?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}