<script setup lang="ts">
import { Component, FileAudio2Icon, FileCode2Icon, FileIcon, FileImageIcon, FileTextIcon, FolderIcon, type LucideIcon } from 'lucide-vue-next';
import type { File } from '../../types/file'

const props = defineProps<{ activeFolder: File | null }>()
const emit = defineEmits(['open', 'load-children'])
const iconMap: Record<string, LucideIcon> = {
    folder: FolderIcon,
    file: FileIcon,
    jpg: FileImageIcon,
    html: FileCode2Icon,
    pdf: FileTextIcon,
    wav: FileAudio2Icon,
    mp3: FileAudio2Icon,
}

const colorMap: Record<string, string> = {
    folder: 'yellow-500',
    file: 'text-blue-300 fill-blue-50',
    jpg: 'text-blue-300 fill-blue-50',
    html: 'text-blue-300 fill-blue-50',
    pdf: 'text-red-400 fill-red-50',
    wav: 'text-red-400 fill-red-50',
    mp3: 'text-red-400 fill-red-50',
}

const getIcon = (extension: string) => {
    return iconMap[extension] || iconMap.file
}

const getColor = (extension: string) => {
    return colorMap[extension] || colorMap.file
}

</script>

<template>
    <div class="flex-1 p-6 overflow-y-auto bg-white">
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
                    <Component :is="getIcon(file.metadata?.extension || 'file')" :class="'w-14 h-14 ' + getColor(file.metadata?.extension || 'file')"/>
                </div>
                <div class="text-xs text-center text-slate-600 font-medium truncate w-full">
                    {{ file.name }}
                </div>
            </div>

            <div v-if="!props.activeFolder?.children?.length" class="col-span-full text-center mt-20 text-slate-400">
                <p class="text-4xl mb-2">💨</p>
                <p>Folder ini kosong</p>
            </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center h-full text-slate-400">
            <p class="text-5xl mb-4">👈</p>
            <p>Pilih folder dari navigasi kiri</p>
        </div>
    </div>
</template>