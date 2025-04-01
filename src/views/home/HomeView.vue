<template>
    <div class="map-header" :class="{'width-reduced': show}">
        <v-text-field
        v-model="objectsStore.searchValue"
        class="search-field"
        variant="solo-filled"placeholder="Search"
        density="compact"
        rounded="xl"
        prepend-inner-icon="mdi-magnify"
        hide-details/>
<!--         <v-select 
        label="Критичність" 
        clearable 
        variant="solo-filled"
        density="compact"
        rounded="xl"
        hide-details
        /> -->
        <v-select
        v-model="objectsStore.filters"
        multiple
        chips
        :label="$t('Ecosystem')" 
        clearable
        variant="solo-filled"
        density="compact"
        rounded="xl"
        hide-details
        :items="Object.values(Ecosystem)"
        />
    </div>
        <MapView/>
        <SideDetails />
</template>
<script setup>
import MapView from '@/components/home/MapView.vue';
import SideDetails from '@/components/home/SideDetails.vue';
import { useObjects } from '@/stores/objectStore.js';
import { Ecosystem } from '@/utils/constants/ecosystem.contants';
import { storeToRefs } from 'pinia';
import { onMounted, computed, ref } from 'vue';

const objectsStore = useObjects();
const { show } = storeToRefs(objectsStore);

const filter = computed({
    get: () => { return null }
});

</script>
<style scoped lang="scss">

.map-header {
    @include centered-flex;
    justify-items: start;
    position: absolute;
    height: 5em;
    top: 5em;
    width: 100vw;
    right: 0;
    z-index: 2;
    gap: 1em;
    padding: 0 2em 0 2em;
    @include transition(width);
    .search-field.v-text-field {
        width: 50%;
    }
}
.width-reduced {
    width: 60vw;
    gap: 1em;
}
</style>