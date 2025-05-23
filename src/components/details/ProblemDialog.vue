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
                        <v-file-input variant="outlined" :placeholder="$t('UploadImage')">

                        </v-file-input>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="handleSend()" class="mr-3 mb-3" :loading="loadingStore.isLoading">{{ $t('Send') }}</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>
<script setup>
import { useFetch } from '@/composables/useFetch';
import { useHandledAsync } from '@/composables/useHandledAsync';
import { useLoadingStore } from '@/stores/loading.store';
import { useNotificationStore } from '@/stores/notification.store';
import { useObjects } from '@/stores/objectStore.js';
import { validations } from '@/utils/constants/validations.constants';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const objectsStore = useObjects();
const { show, object, objects } = storeToRefs(objectsStore);
const description = ref('');
const dialog = ref(false);
const form = ref(null);
const { put, response } = useFetch();
const notifications = useNotificationStore();
const isValid = ref()
const { getActionWithHandling } = useHandledAsync();
const loadingStore = useLoadingStore();
async function handleSend() {
    await getActionWithHandling(async () => {
        if(!isValid.value) return;
        const newIssue = {
            description: description.value,
            date: new Date().toISOString(),
            isResolved: false,
            isAccepted: false,
        }
        if(object.value.assetType === "Forest") {
            newIssue.forestId = object.value.id;
            newIssue.pondId = null;
        } else {
            newIssue.forestId = null;
            newIssue.pondId = object.value.id;
        }

        const response = await axios.post("http://localhost:5000/api/Issues", newIssue)
        description.value = '';
        dialog.value = false;
        notifications.show("Problem successfully created!")
    })()
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