import { resourceRepository } from './resource.repository'

export const resourceService = {
    async getRootResources() {
        const folder = await resourceRepository.getRootResources()
        if (!folder) throw new Error('Folder not found')
        return folder.map((folder) => ({
            ...folder,
            hasChildren: folder.children?.length > 0
        }))
    },

    async getChildrenResources(id: string) {
        const folder = await resourceRepository.getChildrenResources(id)
        if (!folder) throw new Error('Folder not found')
        return folder
    },

    async getSearchByName(keyword: string) {
        return await resourceRepository.search(keyword)
    }
}