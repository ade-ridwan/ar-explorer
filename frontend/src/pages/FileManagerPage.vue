<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import FolderTreeItem from '../components/Explorer/FolderTreeItem.vue'
import FolderContent from '../components/Explorer/FolderContent.vue'
import type { File } from '../types/file'
import { client } from '../utils/api'
import { findPathFunc } from '../utils/explorer-logic'
import { FolderIcon } from 'lucide-vue-next'

const rootFolders = ref<File[]>([])
const selectedFolder = ref<File | null>(null)
const activePath = computed(() => {
    if (!selectedFolder.value) return []
    return findPathFunc(rootFolders.value, selectedFolder.value.id) || []
})

const handleLoadChildren = async (file: File) => {
    if (file.isLoaded || file.isLoading) return
    file.isLoading = true
    // hit endpoint get children files
    const { data, error } = await client.v1.resources.files({ id: file.id }).get()

    if (!error && data) {
        file.children = data.data as File[]
        file.isLoaded = true
    }

    file.isLoading = false
}

const handleSelect = (file: File) => {
    selectedFolder.value = file
    handleLoadChildren(file)
}

const fetchRootFolders = async () => {
    const { data, error } = await client.v1.resources.get()
    if (error) return

    rootFolders.value = data.data as File[]
    selectedFolder.value = null;
    selectedFolder.value = {
        name: 'root',
        type: 'folder',
        id: 'root',
        children: rootFolders.value,
    }
}

const filteredRootFolders = computed(() => {
    return rootFolders.value.filter((f) => f.type === 'folder')
})

onMounted(async () => {
    fetchRootFolders()
})

</script>

<template>
    <div class="flex min-h-screen w-full border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-slate-50">
        <aside
            class="w-72 fixed lg:static inset-0 z-50 bg-slate-50 border-r border-slate-200 lg:bg-slate-50/50 flex flex-col">
            <div id="folder-tree-title" class="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Navigasi
                Folder</div>
            <div class="flex-1 overflow-y-auto pr-4">
                <FolderTreeItem v-for="f in filteredRootFolders" :key="f.id" :file="f" :selectedId="selectedFolder?.id"
                    @select="handleSelect" />
            </div>
        </aside>

        <section class="flex-1 flex flex-col bg-white">
            <header class="h-16 border-bottom justify-between border-slate-100 bg-white flex items-center px-6 shadow-sm z-10">
                <div class="flex w-1/2 overflow-hidden items-center bg-gray-100 py-1 rounded-lg">
                    <div class="flex items-center hover:bg-gray-200 py-1 px-2 rounded cursor-pointer transition-colors"
                        @click="fetchRootFolders">
                        <FolderIcon class="w-4 h-4 mr-2 text-yellow-400" />
                        <span class="text-gray-700 text-sm">Root</span>
                    </div>
                    <div v-for="(folder, index) in activePath" :key="folder.id" class="flex items-center gap-2">
                        <span class="text-slate-300 ml-2">/</span>
                        <span @click="handleSelect(folder)" :class="[
                            'px-2 py-1 rounded cursor-pointer line-clamp-1 transition-colors',
                            index === activePath.length - 1
                                ? ' text-gray-700 rounded-full text-sm font-semibold'
                                : 'hover:bg-gray-200 text-gray-600 text-sm'
                        ]">
                            {{ folder.name }}
                        </span>
                    </div>
                </div>
                <div class="w-1/2 px-4">
                    <div>
                        <input type="text" placeholder="Cari file..."
                            class="w-full p-2 text-xs rounded-lg border border-slate-300">
                    </div>
                </div>
            </header>
            <FolderContent :activeFolder="selectedFolder" @open="handleSelect" />
        </section>
    </div>
</template>