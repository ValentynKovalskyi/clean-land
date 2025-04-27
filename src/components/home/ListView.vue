<template>
    <div class="listview">
        <ListViewItem v-for="object in pageItems" :object="object"/>
        <v-pagination class="listview__pagination" v-model="page" :length="pageCount" rounded="circle" variant="outlined"></v-pagination>
    </div>
</template>
<script setup>
import { useObjects } from '@/stores/objectStore';
import ListViewItem from './listview/ListViewItem.vue';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

const objectsStore = useObjects();
const { searchSuggests } = storeToRefs(objectsStore);
const page = ref(1);
const pageSize = 4;
const pageCount = computed(() => searchSuggests.value.length / pageSize)
const pageItems = computed(() => {
    const start = (page.value - 1) * pageSize;
    return searchSuggests.value.slice(start, start + pageSize);
})
</script>
<style lang="scss" scoped>
.listview {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100vh;
    width: 100%;
    background-color: #fff;
    padding-top: 10em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr max-content;
    padding: 10em 5em 2em 5em;
    &__list {
        grid-area: 1 / 1 / 3 / 2;
        padding: 1em;
        display: flex;
        flex-direction: column;
        gap: 1.5em;
        align-items: stretch;
        overflow-y: auto;
    }
    &__pagination {
        grid-area: 5 / 1 / 5 / 5;
    }
}
</style>