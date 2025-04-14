<template>
    <template v-if="object">
            <h2 class="details__name">
                {{ object.name }}
            </h2>
            <div class="details__criticity" v-tooltip:top="object.criticalityScore + '/10'">
                <v-rating
                :length="criticalityMax"
                v-model="criticality"
                size="small"
                density="compact"
                empty-icon="mdi-circle"
                color="#aaa"
                full-icon="mdi-circle"
                :active-color="criticityColor"
                readonly
                >
            </v-rating>
            </div>
            
            <v-btn variant="plain" @click="objectsStore.toggleShow()" size="xs" density="compact" class="details__close">
                <v-icon icon="mdi-close"></v-icon>
            </v-btn>
            <h1 class="details__district">
                {{ object.district || "Вінницька обл., Оратівський район" }}
            </h1>
                <span class="details__coords">
                    <v-icon icon="mdi-map-marker-outline"/>
                    <a :href="getGoogleMapsHref(object.xLocation, object.yLocation)" target="_blank">
                        {{ object.xLocation + ', ' + object.yLocation }}
                    </a>
                </span>
            <div class="details__actions">
                <v-btn class="donate" variant="outlined" rounded="xl">Задонатити</v-btn>
                <ProblemDialog/>
            </div>
            <div class="details__problems">
                <span class="title">                
                        <span>Проблеми виявлені на об'єкті</span>
                        <v-badge :content=3 color="red" inline size="small" density="compact"/>
                </span>
                <ProblemsGallery />
            </div>
                <span class="details__table__title title">                
                        <span>Відомості про об'єкт</span>
                </span>
                <div class="details__table">
                    <table>
                    <tr>
                        <th colspan="2">Загальні відомості</th>
                    </tr>
                    <tr>
                        <td>Відноситься до басейну річки</td>
                        <td>Басейн</td>
                    </tr>
                    <tr>
                        <td>Басейн</td>
                        <td>Басейн</td>
                    </tr>
                    <tr>
                        <td>Довжина:Ширина:Глибина</td>
                        <td>Басейн</td>
                    </tr>
                    <tr>
                        <td>Рівень води</td>
                        <td>Басейн</td>
                    </tr>
                    <tr>
                        <td>Власник</td>
                        <td>Басейн</td>
                    </tr>
                    <tr>
                        <td>Орендар</td>
                        <td>Басейн</td>
                    </tr>
                    <tr>
                        <td>Номер кадастру</td>
                        <td>Басейн</td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th colspan="2">Показники якості води</th>
                    </tr>
                    <tr>
                        <td>Індекс якості води</td>
                        <td>Басейн</td>
                    </tr>
                    <tr>
                        <td>Насиченість киснем</td>
                        <td>Басейн</td>
                    </tr>
                    <tr>
                        <td>Ознаки евтрофікації</td>
                        <td>Басейн</td>
                    </tr>
                    <tr>
                        <td>Частота цітіння води на рік</td>
                        <td>Басейн</td>
                    </tr>
                    <tr>
                        <td>Концентрація забруднюючих речовин</td>
                        <td>Басейн</td>
                    </tr>
                    <tr>
                        <td>Відсоток заростання</td>
                        <td>Басейн</td>
                    </tr>
                    <tr>
                        <td>Відсоток замулення</td>
                        <td>Басейн</td>
                    </tr>
                </table>
                </div>
        </template>
</template>
<script setup>
import ProblemDialog from '@/components/details/ProblemDialog.vue';
import { useObjects } from '@/stores/objectStore';
import { getGoogleMapsHref } from '@/utils/helpers/getGoogleMapHref';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import ProblemsGallery from '../details/ProblemsGallery.vue';
import { useCriticality } from '@/composables/useCriticality';

const objectsStore = useObjects();
const { t } = useI18n();
const { object } = storeToRefs(objectsStore);
const { criticalityMax, criticality, criticityColor } = useCriticality(computed(() => object.value?.criticalityScore ?? 0))
</script>