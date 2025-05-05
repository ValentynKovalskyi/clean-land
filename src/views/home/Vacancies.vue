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
        <v-pagination class="listview__pagination" v-model="page" :length="pageCount" rounded="circle" variant="outlined"></v-pagination>
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
    height: 100vh;
    overflow: hidden;
    //background-color: red;
    width: 100%;
    padding: 10rem 2rem 2rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
    &:nth-child(1) {
        flex-grow: 10;
    }
    &:nth-child(2) {
        flex-grow: 1;
    }
    &__list {
        display: grid;
        height: 100%;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
        grid-template-rows: repeat(5, max-content);
        overflow-y: auto;
    }
}
</style>