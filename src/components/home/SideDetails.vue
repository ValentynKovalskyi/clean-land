<template>
    <v-card class="details" :class="{ 'object-details--show': show}">
        <template v-if="object">
            <h2 class="details__name">
                {{ object.name }}
            </h2>
            <v-rating
                class="details__criticity"
                :length="criticalityMax"
                v-model="criticity"
                size="small"
                density="compact"
                empty-icon="mdi-circle"
                color="#aaa"
                full-icon="mdi-circle"
                :active-color="criticityColor"
                :title="object.criticalityScore"
                readonly>
            </v-rating>
            <v-btn variant="plain" @click="objectsStore.toggleShow()" size="xs" density="compact">
                <v-icon icon="mdi-close"></v-icon>
            </v-btn>
            <h1 class="details__district">
                {{ object.district || "Вінницька обл., Оратівський район" }}
            </h1>
                <span class="details__coords">
                    <v-icon icon="mdi-map-marker-outline"/>
                    <a :href="getGoogleMapsHref(object.xLocation, object.y)" target="_blank">
                        {{ object.xLocation + ', ' + object.yLocation }}
                    </a>
                </span>
            <div class="details__actions">
                <v-btn class="donate" variant="outlined" rounded="xl">Задонатити</v-btn>
                <ProblemDialog/>
            </div>
            <div class="details__problems">
                Потенційні проблеми
            </div>
            <div class="details__table">
                <span class="details__table__title">Відомості про об'єкт</span>
                <v-data-table class="details__table__datatable" :items="tableData" hide-default-header hide-default-footer>
                    
                </v-data-table>
            </div>
        </template>
    </v-card>
</template>
<script setup>
import ProblemDialog from '@/components/home/ProblemDialog.vue';
import { useObjects } from '@/stores/objectStore';
import { getGoogleMapsHref } from '@/utils/helpers/getGoogleMapHref';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const objectsStore = useObjects();
const { t } = useI18n();
const { show, object } = storeToRefs(objectsStore);
// object criticity
const criticalityMax = ref(6);
const criticity = computed(() => Math.round(object.value.criticalityScore / 10 * criticalityMax.value))
const tableData = computed(() => {
    return Object.entries(object.value)
        .map((entry) => ({ property: t('Object.' + entry[0]), value: entry[1]}))
})
const headers = [
    { title: "Property", align: "center", sortable: false, key: "property" },
    { title: "Value", align: "center", sortable: false, key: "value"},
]
console.log(tableData)
const criticityColor = computed(() => {
    if(criticity.value > 4) return "red";
    else if(criticity.value > 2) return "yellow";
    else return "green";
})
</script>
<style scoped lang="scss">

.details {
    width: 35vw;
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
    grid-template-rows: max-content max-content 2rem 1fr max-content 5fr;
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
        grid-column: span 3;
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
            filter: drop-shadow(2px 2px 2px black);
        }
    }
    &__problems {
        grid-row: 5;
        grid-column: span 2;
    }
    &__table {
        grid-row: 6;
        grid-column: span 2;
        &__title {
            display: block;
            width: 100%;
            text-align: center;
            border: $color-3 1px solid;
            padding: 0.5em;
        }
        &__datatable {
            max-height: min-content;
            overflow-y: visible;
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