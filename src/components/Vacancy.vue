<template>
    <div class="vacancy">
        <h2 class="vacancy__title">{{ item.title}}</h2>
        <h3 class="vacancy__wage">{{ "€" + item.wage }}</h3>
        <div class="vacancy__object">
            <div>
                <h2 class="card-details__name" v-title>
                {{ item.object.name }}
            </h2>
            <div class="card-details__criticity" v-tooltip:top="criticality + '/10'">
                <v-rating
                :length="criticalityMax"
                v-model="criticality"
                size="small"
                density="compact"
                empty-icon="mdi-circle"
                color="#aaa"
                full-icon="mdi-circle"
                :active-color="criticityColor"
                :title="item.object.criticalityScore"
                readonly>
            </v-rating></div>
            </div>
            <div>
                <h3 class="card-details__district" v-title>
                {{ item.object.district || "Вінницька обл., Оратівський район" }}
            </h3>
            <span class="card-details__coords">
                <v-icon icon="mdi-map-marker-outline"/>
                <a :href="getGoogleMapsHref(item.object.xLocation, item.object.yLocation)" target="_blank">
                    {{ item.object.xLocation + ', ' + item.object.yLocation }}
                </a>
            </span>
            </div>
        </div>
        <div class="vacancy__description">
            {{  item.description }}
        </div>
        <div class="vacancy__actions">
            <span>{{ $t("Volunteers") + ':' + item.appliedPeople + '/' + item.neededPeople }}</span>
            <VolounteerDialog :vacancy-id="item.id" :disabled="item.appliedPeople >= item.neededPeople"/>
        </div>
    </div>
</template>
<script setup>
import { useCriticality } from '@/composables/useCriticality';
import { getGoogleMapsHref } from '@/utils/helpers/getGoogleMapHref';
import { computed, onMounted } from 'vue';
import VolounteerDialog from './details/VolounteerDialog.vue';

const props = defineProps({
    item: Object,
})

const { criticalityMax, criticality, criticityColor } = useCriticality(computed(() => props.item.object.criticalityScore ?? 0))
const description = ref();

/* onMounted(() => {
    if(props.item.description.length) {
        description.value.split('\n').map((paragraph) => {
            const p = document.createElement('p');
            p.innerText = paragraph;
            p
        })
    }
}) */
</script>
<style lang="scss">
.vacancy {
    height: 100%;
    width: 100%;
    display: grid;
    padding: 1em;
    grid-template-columns: 1fr 1fr;
    row-gap: 1em;
    grid-template-rows: max-content max-content max-content max-content;
    &__title {
        grid-row: 1;
        grid-column: 1;
        @include text-ellipsis;
    }
    &__wage {
        grid-row: 1;
        grid-column: 2;
        color: green;
        align-self: center;
    }
    &__object {
        grid-row: 2;
        grid-column: span 2;
        display: flex;
        flex-direction: column;
        & > * {
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 1em;
        }
    }
    &__description {
        grid-column: span 2;
        grid-row: 3;
        text-indent: 1.5em;
    }
    &__actions {
        grid-column: span 2;
        grid-row: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }
}
</style>