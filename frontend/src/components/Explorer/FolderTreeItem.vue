<script setup lang="ts">
import { computed, ref } from 'vue'
import type { File } from '../../types/file'
import { ChevronDownIcon, ChevronRightIcon, FolderIcon } from 'lucide-vue-next';

const props = defineProps<{
  file: File;
  selectedId?: string;
}>()

const emit = defineEmits(['select', 'load-children'])
const isOpen = ref<boolean>(false)
const filteredRootFolders = computed(() => {
  return props.file.children?.filter((f) => f.type === 'folder')
})

const toggle = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && !props.file.isLoaded) {
    emit('load-children', props.file)
  }
  emit('select', props.file)
}
</script>

<template>
  <div class="ml-4">
    <div @click="toggle" :class="[
      'flex items-center gap-2 px-2 py-1 cursor-pointer rounded text-sm transition-colors',
      selectedId === file.id ? 'bg-blue-100 text-black font-medium' : 'hover:bg-slate-200 text-slate-700'
    ]">
      <span class="w-2 text-[10px] text-center">
        <span v-if="file.hasChildren || file.children?.length">
          <ChevronDownIcon class="w-3 h-3 text-gray-500" v-if="isOpen" />
          <ChevronRightIcon class="w-3 h-3 text-gray-500" v-else />
        </span>
      </span>
      <FolderIcon class="w-4 h-4 fill-yellow-500 text-yellow-500 opacity-80" />
      <span class="truncate">{{ file.name }}</span>
    </div>

    <div v-if="isOpen && file.children" class="border-l border-dashed border-slate-300 ml-2">
      <FolderTreeItem v-for="child in filteredRootFolders" :key="child.id" :file="child" :selectedId="selectedId"
        @select="(f) => emit('select', f)" @load-children="(f) => emit('load-children', f)" />
    </div>
    <div v-else-if="file.isLoading" class="ml-2">
      <div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
    </div>
  </div>
</template>