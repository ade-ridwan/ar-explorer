<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import type { File } from '../../types/file'
import { client } from '../../utils/api'
import { getColor, getIcon } from '../../utils/explorer-icon'

const searchInput = ref('')
const suggestions = ref<File[]>([])
const showDropdown = ref(false)
let debounceTimeout: any

const emit = defineEmits(['select-result'])

// Fungsi Debounce Manual
watch(searchInput, (newValue) => {
    clearTimeout(debounceTimeout)

    if (newValue.length < 2) {
        suggestions.value = []
        showDropdown.value = false
        return
    }

    debounceTimeout = setTimeout(async () => {
        const { data } = await client.v1.resources.search.get({ query: { q: newValue } })
        if (data?.status === 'success') {
            suggestions.value = data.data  as File[]
            showDropdown.value = true
        }
    }, 300)
})

const selectItem = (item: File) => {
    if(item.type === 'folder') {
        emit('select-result', item)
    }else{
        emit('select-result', item.parent)
    }
    searchInput.value = ''
    showDropdown.value = false
}
</script>

<template>
    <div class="relative w-full max-w-md">
        <div class="relative">
            <input v-model="searchInput" @focus="showDropdown = true" type="text" placeholder="Cari file..."
                class="w-full p-2 h-9 text-sm rounded-lg border bg-slate-100 border-slate-200">
            <SearchIcon class="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2 text-slate-400" />
        </div>

        <ul v-if="showDropdown"
            class="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
            <li v-for="item in suggestions" :key="item.id" @click="selectItem(item)"
                class="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 border-b border-gray-300 last:border-0">
                <component :is="getIcon(item.metadata?.extension || 'folder')"
                    :class="'w-6 h-6 ' + getColor(item.metadata?.extension || 'folder')" />
                <div class="flex flex-col">
                    <span class="text-sm font-medium text-slate-700">{{ item.name }}</span>
                    <span class="text-[10px] text-slate-400">{{ item.parent?.name }}</span>
                </div>
            </li>

            <li v-if="suggestions.length === 0" class="px-4 py-3 text-center text-slate-400">
                <p>Tidak ada hasil</p>
            </li>
        </ul>
    </div>
</template>