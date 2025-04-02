<template>
    <div class="map-header" :class="{'map-header--sidebar': show}">
        <div class="search">
            <v-text-field
                v-model="objectsStore.searchValue"
                variant="solo-filled"
                placeholder="Search"
                density="compact"
                rounded="xl"
                prepend-inner-icon="mdi-magnify"
                hide-details />
                <v-menu v-show="objectsStore.searchSuggests.length > 3" v-model="suggestsMenu" activator="parent" class="search__suggests">
                    <v-list>
                        <v-list-item v-for="item in objectsStore.searchSuggests" class="suggests__item" @click="objectsStore.showObject(item)">
                            {{ [ item.name, item.district ].join(', ')}}
                        </v-list-item>
                    </v-list>
                </v-menu>
        </div>
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
        <v-btn @click="toggleView" variant="solo-filled" color="white" rounded="xl" class="toggleButton">
            {{ isListView ? $t('MapView'): $t('ListView')}}
        </v-btn>
    </div>
    <ListView v-if="isListView"/>
    <MapView v-else/>
    <SideDetails />
</template>
<script setup>
import ListView from '@/components/home/ListView.vue';
import MapView from '@/components/home/MapView.vue';
import SideDetails from '@/components/home/SideDetails.vue';
import { useObjects } from '@/stores/objectStore.js';
import { Ecosystem } from '@/utils/constants/ecosystem.contants';
import { searchFilter } from '@/utils/filters/search.filter';
import { storeToRefs } from 'pinia';
import { onMounted, computed, ref } from 'vue';

const objectsStore = useObjects();
const { show } = storeToRefs(objectsStore);
const isListView = ref(false)
function toggleView() {
    isListView.value = !isListView.value;
}
const suggestsMenu = ref(false)
</script>
<style scoped lang="scss">

.map-header {
    @include centered-flex;
    justify-items: center;
    position: absolute;
    height: 5em;
    top: 5em;
    width: 60vw;
    right: 50%;
    transform: translateX(50%);
    z-index: 2;
    gap: 1em;
    padding: 0 2em 0 2em;
    @include transition(all);
    & > * {
        @include shadow(3px);
        &:nth-child(1) {
            flex-grow: 4;
        }
        &:nth-child(2) {
            flex-grow: 2;
        }
        &:nth-child(3) {
            flex-grow: 1;
        }
    }
    &--sidebar {
        right: 0;
        transform: translateX(0);
    }
}

.search {
    width: 50%;
    position: relative;
    &__suggests {
    position: absolute;
    width: 100%;
    flex-grow: 2;
    &__item {
        cursor: pointer;
        &:hover {
        text-decoration: underline;
    }
    }
}   
}
.suggests {
    position: absolute;
    width: 100%;
    &__item {
        cursor: pointer;
        &:hover {
        text-decoration: underline;
    }
    }
}

.toggleButton {
    background-color: green;
}
</style>