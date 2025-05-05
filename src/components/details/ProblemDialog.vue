<template>
    <v-dialog v-model="dialog">
        <template #activator="{ props: activatorProps}">
            <slot :activatorProps="activatorProps"></slot>
        </template>
        <template #default="{ isActive }">
            <v-card class="problem-form" rounded="lg">
                <v-card-title>
                    <h2>{{ $t('NotifyAboutProblem') }}</h2>
                </v-card-title>
                <v-card-text>
                    <p class="mb-3" style="font-weight: 500;">{{ $t("If you detect any ecological issues on this site, please let us know. Describe the problem in a few sentences.") }}</p>
                    <v-form ref="form" v-model="isValid">
                        <v-textarea v-model="description" :placeholder="$t('DescribeProblem')" variant="outlined" no-resize :rules="[validations.minLength(20)]">
                        </v-textarea>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="handleSend()" class="mr-3 mb-3">{{ $t('Send') }}</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>
<script setup>
import { useFetch } from '@/composables/useFetch';
import { useObjects } from '@/stores/objectStore.js';
import { validations } from '@/utils/constants/validations.constants';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const objectsStore = useObjects();
const { show, object, objects } = storeToRefs(objectsStore);
const description = ref('');
const dialog = ref(false);
const form = ref(null);
const { put, response } = useFetch();
const isValid = ref()
async function handleSend() {
    if(!isValid.value) return;
        const newIssue = {
            description: description.value,
            date: new Date().toISOString(),
            isResolved: false,
        }
        const { issues, mapMarker, ...rest } = object.value
        const data = {
            ...rest,
            issues: [ ...(issues ? issues: []), newIssue],
        }
        objectsStore.updateObject(data);
        dialog.value = false;
        description.value = '';
}
</script>
<style lang="scss">
.problem-form {
    width: 40vw;
    height: fit-content;
    position: fixed;
    padding: 1em;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
}
</style>