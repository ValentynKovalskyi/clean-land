<template>
    <div class="map-header" :class="{'map-header--sidebar': show && !isListView}">
        <div class="mapsearch">
            <v-text-field
                v-model="objectsStore.searchValue"
                variant="solo-filled"
                placeholder="Search"
                density="compact"
                rounded="xl"
                prepend-inner-icon="mdi-magnify"
                hide-details />
                <v-menu v-if="!isListView" v-model="suggestsMenu" activator="parent" class="mapsearch__suggests">
                    <v-list>
                        <v-list-item v-for="item in objectsStore.searchSuggests" 
                        class="suggests__item" 
                        @click="objectsStore.showObject(item)" 
                        :key="item.id"
                        >
                        <span v-html="getWithSearchHighlight([ item.name, item.district ].join(', '))"></span>
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
    <Transition name="float">
        <ListView v-if="isListView"/>
    </Transition>
    <MapView/>
    <DialogDetails v-if="isListView"/>
    <SideDetails v-else/>
</template>
<script setup>
import ListView from '@/components/home/ListView.vue';
import MapView from '@/components/home/MapView.vue';
import SideDetails from '@/components/details/SideDetails.vue';
import { useObjects } from '@/stores/objectStore.js';
import { Ecosystem } from '@/utils/constants/ecosystem.contants';
import { searchFilter } from '@/utils/filters/search.filter';
import { storeToRefs } from 'pinia';
import { onMounted, computed, ref } from 'vue';
import DialogDetails from '@/components/details/DialogDetails.vue';

const objectsStore = useObjects();
const { show, searchValue } = storeToRefs(objectsStore);
const isListView = ref(false)
function toggleView() {
    isListView.value = !isListView.value;
}
const suggestsMenu = ref(false)
function getWithSearchHighlight(str) {
    if(!searchValue.value) return str;
    const regex = new RegExp(`(${searchValue.value})`, "gi");
    return str.replace(regex, '<span class="mapsearch__suggests__item--highlight">$1</span>');
}
</script>
<style lang="scss">

.map-header {
    @include centered-flex;
    justify-items: center;
    position: absolute;
    z-index: 9;
    height: 5em;
    top: 5em;
    width: 60vw;
    right: 50%;
    transform: translateX(50%);
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

.mapsearch {
    width: 50%;
    position: relative;
    &__suggests {
    position: absolute;
    width: 100%;
        &__item {
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        &--highlight {
            background-color: $color-4;
            font-weight: bolder;
        }
    }
}
}   


.toggleButton {
    background-color: green;
}

.float-enter-active,
.float-leave-active {
  transition: all 0.5s ease;
  transform: translateY(0%);
}

.float-enter-from,
.float-leave-to {
  transform: translateY(100%);
}
</style>