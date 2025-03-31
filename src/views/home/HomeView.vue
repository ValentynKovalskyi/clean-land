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
    <v-card class="details" :class="{ 'object-details--show': show}">
        <template v-if="object">
            <h2 class="details__name">
                {{ object.name }}
            </h2>
            <v-rating
                class="details__criticity"
                v-model="rating"
                size="small"
                density="compact"
                empty-icon="mdi-circle-outline"
                full-icon="mdi-circle"
                half-increments
                active-color="red"
                disabled>
            </v-rating>
            <v-btn variant="plain" @click="objectsStore.toggleShow()" size="xs">
                <v-icon icon="mdi-close"></v-icon>
            </v-btn>
            <h1 class="details__district">
                {{ object.district || "Вінницька обл., Оратівський район" }}
            </h1>
                <span class="details__coords">
                    <v-icon icon="mdi-map-marker-outline"/>
                    <a :href="getGoogleMapsRef()" target="_blank">
                        {{ object.xLocation + ', ' + object.yLocation }}
                    </a>
                </span>
                <span class="details__date">
                    <v-icon icon="mdi-calendar-month-outline"/>
                    <a :href="getGoogleMapsRef()" target="_blank">
                        {{ object.xLocation + ', ' + object.yLocation }}
                    </a>
                </span>
            <div class="details__actions">
                <v-btn class="donate" variant="outlined" rounded="xl">Задонатити</v-btn>
                <ProblemDialog/>
            </div>
            <v-expansion-panels v-if="object.issues || (object.issues && object.issues.length !== 0)">
                <v-expansion-panel title="Потенційні проблеми" :text="issuesText"
                ></v-expansion-panel>
            </v-expansion-panels>
        <v-card-text>
            <p style="margin-bottom: 1em;">{{ [object.district, object.territorialComminity, object.settlement].filter((o) => o).join(', ') }}</p>
            
            <p v-if="object.notes">{{ object.notes }}</p>
            <p v-if="object.description">{{ object.description }}</p>
            <br>
            <v-expansion-panels v-if="object.issues || (object.issues && object.issues.length !== 0)">
                <v-expansion-panel title="Потенційні проблеми" :text="issuesText"
                ></v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
        </template>
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
// object criticity
const rating = ref(3);
const filter = ref()
function getGoogleMapsRef () {
    return object.value ? `https://google.com/maps/place/${object.value.xLocation + ',' + object.value.yLocation}`: ''
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

.details {
    width: 40vw;
    bottom: 0;
    height: 85vh;
    border-top-right-radius: 25px;
    left: 0;
    z-index: 2;
    padding: 2em;
    position: absolute;
    left: 0;
    transform: translateX(-100%);
    display: grid;
    grid-template-rows: 2rem 3rem 2rem 1fr 9fr;
    grid-template-columns: 60fr 40fr 2em;
    a {
        all: unset;
        padding-left: 1em;
        color: $color-3;
        font-weight: 600;
    }
    a:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    &__name {
        font-weight: 500;
        font-size: 2rem;
        align-self: center;
    }
    &__criticity {
        align-self: center;
    }
    &__district {
        font-weight: 400;
        font-size: 2rem;
        grid-column: span 2;
        grid-row: 2;
    }
    &__coords {
        grid-row: 3;
        grid-column: 1;
    }
    &__date {
        grid-row: 3;
        grid-column: 2;
    }
    &__actions {
        grid-row: 4;
        grid-column: span 2;
        @include centered-flex;
        gap: 2em;
        &__donate {
            filter: drop-shadow(2px 2px 2 px black);
        }
    }


    @include transition;
    .v-card-title {
        @include centered-flex;
        justify-content: space-between;
    }
}

.object-details--show {
    transform: translateX(0%);
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