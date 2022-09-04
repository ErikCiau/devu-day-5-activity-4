<template>
    <table class="w-full overflow-x-scroll">
        <tr class="overflow-x-scroll">
            <th class="uppercase text-center font-semibold text-sm whitespace-nowrap overflow-scroll py-2 px-4"
                v-for="head of headers">{{ head }}
            </th>
            <th class="uppercase text-center font-semibold text-sm whitespace-nowrap overflow-scroll py-2 px-4">
                Actions
            </th>
        </tr>
        <tr v-for="content in body" class="text-center overflow-scroll hover:even:bg-slate-100 hover:odd:bg-slate-50">
            <td class="py-2 px-4 whitespace-nowrap max-w-0" v-for="key in content">
                {{ key }}
            </td>
            <td>
                <slot name="actions" :item="content" />
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">
defineProps<{
    headers: string[]
    body: any[]
    actions?: boolean
}>()
</script>