<script setup lang="ts">
import { Component, FolderIcon, FolderOpenIcon, FolderOutputIcon, FolderPlusIcon, LayoutGridIcon, LayoutListIcon } from 'lucide-vue-next';
import type { File } from '../../types/file';
import { getColor, getIcon } from '../../utils/explorer-icon';

const props = defineProps<{ activeFolder: File | null }>()
const emit = defineEmits(['open', 'load-children'])

</script>

<template>
    <div class="flex-1 overflow-y-auto bg-white">
        <div class="px-6 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <FolderOpenIcon class="w-5 h-5 text-yellow-400" />
                <h1 class="font-medium text-gray-600">
                    {{ props.activeFolder?.name }}
                </h1>
            </div>
            <div class="hidden items-center gap-1">
                <button class="flex items-center p-1.5 rounded-lg hover:bg-slate-200 transition-colors">
                    <LayoutListIcon class="w-4 h-4" />
                </button>
                <button class="flex items-center p-1.5 rounded-lg hover:bg-slate-200 transition-colors">
                    <LayoutGridIcon class="w-4 h-4" />
                </button>
                <button class="flex items-center p-1.5 rounded-lg hover:bg-slate-200 transition-colors">
                    <FolderPlusIcon class="w-4 h-4" />
                </button>
            </div>
        </div>
        <div class="p-6">
            <div v-if="props.activeFolder" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div v-for="child in props.activeFolder?.children?.filter((f) => f.type === 'folder')" :key="child.id"
                    @dblclick="emit('open', child)"
                    class="flex flex-col items-center p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-all group">
                    <div class="text-5xl mb-2 group-hover:scale-110 transition-transform">
                        <FolderIcon class="text-yellow-500 fill-amber-300 w-14 h-14" />
                    </div>
                    <div class="text-xs text-center text-slate-600 font-medium truncate w-full">
                        {{ child.name }}
                    </div>
                </div>

                <div v-for="file in props.activeFolder?.children?.filter((f) => f.type === 'file')" :key="file.id"
                    class="flex flex-col items-center p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-all group">
                    <div class="text-5xl mb-2 group-hover:scale-110 transition-transform">
                        <Component :is="getIcon(file.metadata?.extension || 'file')"
                            :class="'w-14 h-14 ' + getColor(file.metadata?.extension || 'file')" />
                    </div>
                    <div class="text-xs text-center text-slate-600 font-medium truncate w-full">
                        {{ file.name }}
                    </div>
                </div>

                <div v-if="!props.activeFolder?.children?.length"
                    class="col-span-full text-center mt-20 text-slate-400">
                    <FolderOpenIcon class="w-14 h-14 mb-2 mx-auto" />
                    <p>Folder ini kosong</p>
                </div>
            </div>

            <div v-else class="flex flex-col items-center justify-center h-full text-slate-400">
                <p class="text-5xl mb-4">
                    <FolderOpenIcon class="w-14 h-14 mb-2 mx-auto" />
                </p>
                <p>Pilih folder dari navigasi kiri</p>
            </div>
        </div>
    </div>
</template>