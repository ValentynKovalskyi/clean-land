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
        v-model="filter"
        :label="$t('Ecosystem')" 
        clearable 
        variant="solo-filled"
        density="compact"
        rounded="xl"
        hide-details
        :items="[
            {title: 'Ставки', value: 0},
            {title: 'Ліси', value: 1},
        ]"
        @update:model-value="handleUpdateFilter()"
        />
    </div>
        <MapView/>
    <v-card v-if="show" rounded="0" class="object-details">
        <v-card-title>
            <div>
                <p class="coords">
                    <v-icon icon="mdi-map-marker-outline"/>
                    <a :href="getGoogleMapsRef()" target="_blank">
                        {{ object.xLocation + ', ' + object.yLocation }}
                    </a>
                </p>
                <h2>{{ object.name }}</h2>
            </div>
            <v-btn variant="plain" @click="objectsStore.toggleShow()">
                <v-icon icon="mdi-close"></v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
            <p style="margin-bottom: 1em;">{{ [object.district, object.territorialComminity, object.settlement].filter((o) => o).join(', ') }}</p>
            <div class="actions">
                <v-btn class="donate" variant="outlined" rounded="xl">Задонатити</v-btn>
                <ProblemDialog/>
            </div>
            <p v-if="object.notes">{{ object.notes }}</p>
            <p v-if="object.description">{{ object.description }}</p>
            <br>
            <v-expansion-panels v-if="object.issues || (object.issues && object.issues.length !== 0)">
                <v-expansion-panel title="Потенційні проблеми" :text="issuesText"
                ></v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>
<script setup>
import MapView from '@/components/home/MapView.vue';
import ProblemDialog from '@/components/home/ProblemDialog.vue';
import { useObjects } from '@/stores/objectStore.js';
import { storeToRefs } from 'pinia';
import { onMounted, computed, ref } from 'vue';

const objectsStore = useObjects();
const { show, object, objects } = storeToRefs(objectsStore);
const filter = ref()
function getGoogleMapsRef () {
    return `https://google.com/maps/place/${object.value.xLocation + ',' + object.value.yLocation}`
}
const issuesText = computed(() => {
    if(object.value.issues) {
        return object.value.issues.map((i) => {
            return i.description + ' ' + new Date(i.date).toLocaleDateString();
        })
    } else return []
});

function handleUpdateFilter() {
    console.log(filter.value)
    if(filter.value) {
        objectDetails.showForests();
    } else {
        objectDetails.showPonds();
    }
}
</script>
<style scoped lang="scss">
.v-card {
    width: 40vw;
    position: absolute;
    bottom: 0;
    left: 0;
    height: calc(100vh - 5em);
    z-index: 2;
    padding: 2em 0 2em 2em;
}

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
    .search-field.v-text-field {
        width: 50%;
    }
}
.width-reduced {
    width: 60vw;
    gap: 1em;
}

.object-details {
    .v-card-title {
        @include centered-flex;
        justify-content: space-between;
    }
}

.coords {
    color: $color-3;
    a {
        all: unset;
    }
}

.coords:hover {
    text-decoration: underline;
    cursor: pointer;
}

.donate {
    color: red;
    font-weight: bold;
}

.actions {
    @include centered-flex;
    gap: 2em;
    margin: 1em;
}
</style>