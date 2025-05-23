<template>
    <div class="map-header">
        <v-text-field
                v-model="vacanciesStore.searchValue"
                variant="solo-filled"
                :placeholder="$t('Search')"
                density="compact"
                rounded="xl"
                prepend-inner-icon="mdi-magnify"
                hide-details />
    </div>
    <div class="vacancies">
        <div class="vacancies__list">
            <Vacancy v-for="item of pageItems" :item="item" :key="item.id" />
        </div>
        <v-pagination class="vacancies__pagination" v-model="page" :length="pageCount" rounded="circle" variant="outlined"></v-pagination>
    </div>
</template>
<script setup>
import Vacancy from '@/components/Vacancy.vue';
import { useVacanciesStore } from '@/stores/vacanciesStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';


const vacanciesStore = useVacanciesStore();
const { searchVacancies } = storeToRefs(vacanciesStore);

const page = ref(1);
const pageSize = 10;
const pageCount = computed(() => Math.ceil(Math.max(searchVacancies.value.length / pageSize, 1)))
const pageItems = computed(() => {
    const start = (page.value - 1) * pageSize;
    return searchVacancies.value.slice(start, start + pageSize);
})

onMounted(async () => {
    await vacanciesStore.fetchVacancies();
})
</script>
<style lang="scss">
.vacancies {
    height: 100%;
    width: 100%;
    //background-color: red;
    overflow: hidden;
    padding: 10rem 2rem 2rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;

    &__pagination {
        margin-top: auto;
        flex-shrink: 0;
    }
    &__list {
        display: grid;
        flex: 1;
        grid-template-columns: 1fr 1fr;
        row-gap: 2rem;
        column-gap: 1rem;
        //align-items: center;
        //justify-items: center;
        align-content: stretch;
        width: 100%;
        padding: 0 5rem;
        grid-auto-rows: max-content;
        overflow-y: auto;
        min-height: 0;
    }
}
</style>