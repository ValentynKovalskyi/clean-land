<template>
    <v-card class="listviewitem" elevation="0">
        <h2 class="card-details__name" v-title @click="objectStore.showObject(object)">
                {{ object.name }}
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
                :title="object.criticalityScore"
                readonly>
            </v-rating></div>
            
            <h3 class="card-details__district" v-title>
                {{ object.district || "Вінницька обл., Оратівський район" }}
            </h3>
            <span class="card-details__coords">
                <v-icon icon="mdi-map-marker-outline"/>
                <a :href="getGoogleMapsHref(object.xLocation, object.yLocation)" target="_blank">
                    {{ object.xLocation + ', ' + object.yLocation }}
                </a>
            </span>
            <div class="card-details__actions">
                <a class="card-details__donate">
                    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_380_888)">
<rect x="11" y="11" width="40" height="40" rx="20" fill="white" shape-rendering="crispEdges"/>
<rect x="10.5" y="10.5" width="41" height="41" rx="20.5" stroke="#FF0B0B" shape-rendering="crispEdges"/>
<path d="M37.0001 22.4235C36.9999 23.326 36.643 24.1919 36.0071 24.8325C34.5431 26.3085 33.1226 27.8475 31.6031 29.2695C31.4334 29.424 31.2109 29.5075 30.9815 29.5028C30.752 29.498 30.5332 29.4054 30.3701 29.244L25.9931 24.834C25.3564 24.1932 24.9991 23.3267 24.9991 22.4235C24.9991 21.5202 25.3564 20.6537 25.9931 20.013C26.3105 19.6931 26.6882 19.4393 27.1042 19.2661C27.5202 19.0929 27.9664 19.0037 28.4171 19.0037C28.8677 19.0037 29.3139 19.0929 29.7299 19.2661C30.1459 19.4393 30.5236 19.6931 30.8411 20.013L31.0001 20.1735L31.1591 20.013C31.6356 19.5313 32.2447 19.2023 32.9088 19.0678C33.573 18.9334 34.2621 18.9997 34.8884 19.2582C35.5148 19.5167 36.0501 19.9557 36.4261 20.5194C36.8021 21.083 37.0019 21.7459 37.0001 22.4235Z" stroke="#FF0000" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M40 43.0039L45.736 37.2679C45.9048 37.0993 45.9998 36.8705 46 36.6319V28.7539C46 28.1572 45.7629 27.5849 45.341 27.1629C44.919 26.741 44.3467 26.5039 43.75 26.5039C43.1533 26.5039 42.581 26.741 42.159 27.1629C41.7371 27.5849 41.5 28.1572 41.5 28.7539V35.5039" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M40 37.0039L41.287 35.7169C41.3549 35.6496 41.4087 35.5694 41.4453 35.4811C41.4818 35.3927 41.5004 35.298 41.5 35.2024C41.4989 35.0677 41.4609 34.9359 41.39 34.8213C41.3191 34.7068 41.2181 34.6139 41.098 34.5529L40.4335 34.2214C39.8705 33.9399 39.2333 33.8426 38.612 33.9433C37.9907 34.044 37.4168 34.3375 36.9715 34.7824L35.629 36.1249C35.0664 36.6874 34.7502 37.4503 34.75 38.2459V43.0039M22 43.0039L16.264 37.2679C16.0952 37.0993 16.0002 36.8705 16 36.6319V28.7539C16 28.1572 16.2371 27.5849 16.659 27.1629C17.081 26.741 17.6533 26.5039 18.25 26.5039C18.8467 26.5039 19.419 26.741 19.841 27.1629C20.2629 27.5849 20.5 28.1572 20.5 28.7539V35.5039" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 37.0035L20.713 35.7165C20.5786 35.5787 20.5023 35.3945 20.5 35.202C20.5 34.9275 20.656 34.677 20.902 34.5525L21.5665 34.221C22.1295 33.9395 22.7667 33.8422 23.388 33.9429C24.0093 34.0436 24.5832 34.3372 25.0285 34.782L26.371 36.1245C26.9336 36.687 27.2498 37.4499 27.25 38.2455V43.0035" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<filter id="filter0_d_380_888" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_380_888"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_380_888" result="shape"/>
</filter>
</defs>
</svg>
                </a>
                <ProblemDialog v-slot="{ activatorProps }">
                <a class="card-details__problem" v-bind="activatorProps">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_380_889)">
<rect x="10" y="10" width="40" height="40" rx="20" fill="#FF0000" shape-rendering="crispEdges"/>
<path d="M36.7448 26.7662H36.7548M36.7548 24.2612V21.1313M24.8771 43H21.397C20.9932 43 20.5869 42.9425 20.2157 42.7837C19.0082 42.265 18.3944 41.5788 18.1094 41.15C18.032 41.0312 17.994 40.8911 18.0008 40.7496C18.0075 40.608 18.0586 40.4721 18.1469 40.3612C19.5469 38.5012 22.792 37.3788 24.8771 37.3788M24.8833 43H28.3621C28.7671 43 29.1722 42.9425 29.5434 42.7837C30.7522 42.265 31.3647 41.5788 31.651 41.15C31.7283 41.0312 31.7663 40.8911 31.7596 40.7496C31.7529 40.608 31.7017 40.4721 31.6135 40.3612C30.2134 38.5012 26.9684 37.3788 24.8833 37.3788M43 23.99C43 27.2975 40.1999 29.98 36.7448 29.98C36.3382 29.98 35.9348 29.9425 35.5348 29.8675C35.2473 29.8138 35.1048 29.7875 35.0036 29.8025C34.9036 29.8175 34.761 29.8925 34.4785 30.045C33.6693 30.4764 32.738 30.6213 31.836 30.4563C32.1785 30.0338 32.411 29.5275 32.5147 28.985C32.5772 28.6538 32.4222 28.3313 32.1897 28.095C31.1041 27.0042 30.4931 25.5289 30.4897 23.99C30.4897 20.6825 33.2898 18 36.7448 18C40.1999 18 43 20.6825 43 23.99ZM28.3559 30.8612C28.3546 31.7811 27.988 32.6628 27.3369 33.3126C26.6857 33.9623 25.8032 34.3269 24.8833 34.3262C24.4276 34.3269 23.9762 34.2378 23.555 34.064C23.1337 33.8902 22.7508 33.6352 22.4281 33.3134C22.1054 32.9917 21.8493 32.6095 21.6743 32.1888C21.4993 31.768 21.4089 31.3169 21.4082 30.8612C21.4087 30.4055 21.499 29.9542 21.6739 29.5333C21.8488 29.1124 22.105 28.7301 22.4277 28.4082C22.7504 28.0864 23.1333 27.8312 23.5547 27.6573C23.976 27.4835 24.4275 27.3943 24.8833 27.395C25.8034 27.3943 26.6861 27.7591 27.3373 28.4091C27.9885 29.0591 28.3549 29.9412 28.3559 30.8612Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<filter id="filter0_d_380_889" x="0" y="0" width="60" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_380_889"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_380_889" result="shape"/>
</filter>
</defs>
</svg>
                </a>
            </ProblemDialog>
            </div>
    </v-card>
</template>
<script setup>
import ProblemDialog from '@/components/details/ProblemDialog.vue';
import { useCriticality } from '@/composables/useCriticality';
import { useObjects } from '@/stores/objectStore';
import { getGoogleMapsHref } from '@/utils/helpers/getGoogleMapHref';
import { computed } from 'vue';

const props = defineProps({
    object: {
        type: Object,
        required: true,
    }
})
const objectStore = useObjects();
const { criticalityMax, criticality, criticityColor } = useCriticality(computed(() => props.object.criticalityScore ?? 0))
</script>
<style lang="scss">
.listviewitem {
    padding: 1em;
    display: grid;
    grid-template-rows: max-content max-content 1fr;
    grid-template-columns: 3fr 2fr;
    row-gap: 0.2em;
    border-radius: 0;
    border: 1px solid rgb(206, 206, 206);
}

.card-details {
    &__name {
    font-weight: 500;
    font-size: 1.4rem;
    @include text-ellipsis;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    }
    &__criticity {
        align-self: center;
    }
    &__district {
        grid-column: span 2;
        font-weight: 400;
        font-size: 1.4rem;
        @include text-ellipsis;
    }
    &__coords {
        grid-row: 3;
        grid-column: 1;
        & a {
            text-decoration: none;
            color: $font-primary;
            font-weight: 400;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    &__actions {
        display: flex;
        gap: 0.5em;
        justify-self: end;
        & > * {
            cursor: pointer;
            transition: filter 0.2s ease-in-out;
            &:hover {
                filter: brightness(0.9);
            }
        }
    }
}
</style>