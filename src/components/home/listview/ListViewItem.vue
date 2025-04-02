<template>
    <v-card class="listviewitem">
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
            <h1 class="details__district">
                {{ object.district || "Вінницька обл., Оратівський район" }}
            </h1>
                <span class="details__coords">
                    <v-icon icon="mdi-map-marker-outline"/>
                    <a :href="getGoogleMapsHref(object.xLocation, object.yLocation)" target="_blank">
                        {{ object.xLocation + ', ' + object.yLocation }}
                    </a>
                </span>
    </v-card>
</template>
<script setup>
import { getGoogleMapsHref } from '@/utils/helpers/getGoogleMapHref';

defineProps({
    object: {
        type: Object,
        required: true,
    }
})
</script>
<style lang="scss" scoped>
.listviewitem {
    padding: 1em;
    @include shadow;
}
</style>