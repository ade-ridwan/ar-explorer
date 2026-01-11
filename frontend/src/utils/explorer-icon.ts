import { FolderIcon, FileAudio2Icon, FileCode2Icon, FileIcon, FileImageIcon, FileTextIcon, type LucideIcon, FileVideoIcon, FileArchiveIcon } from 'lucide-vue-next'

const iconMap: Record<string, LucideIcon> = {
    folder: FolderIcon,
    file: FileIcon,
    jpg: FileImageIcon,
    png: FileImageIcon,
    html: FileCode2Icon,
    pdf: FileTextIcon,
    wav: FileAudio2Icon,
    mp3: FileAudio2Icon,
    mp4: FileVideoIcon,
    css: FileCode2Icon,
    zip: FileArchiveIcon,
}

const colorMap: Record<string, string> = {
    folder: 'text-yellow-500 fill-yellow-50',
    file: 'text-blue-300 fill-blue-50',
    jpg: 'text-blue-300 fill-blue-50',
    png: 'text-blue-300 fill-blue-50',
    html: 'text-blue-300 fill-blue-50',
    pdf: 'text-red-400 fill-red-50',
    wav: 'text-red-400 fill-red-50',
    mp3: 'text-red-400 fill-red-50',
    css: 'text-blue-300 fill-blue-50',
}

const getIcon = (extension: string) => {
    return iconMap[extension] || iconMap.file
}

const getColor = (extension: string) => {
    return colorMap[extension] || colorMap.file
}

export {
    getIcon,
    getColor
}