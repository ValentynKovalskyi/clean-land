<template>
    <v-dialog v-model="dialog">
        <template #activator="{ props: activatorProps}">
            <v-btn :color="disabled ? 'grey': 'green'" :disabled="disabled" rounded="xl" v-bind="activatorProps">{{ $t("Become a volunteer") }}</v-btn>
        </template>
        <template #default="{ isActive }">
            <v-card class="vol-form" rounded="lg">
                <v-card-title>
                    <h2>{{ $t('Join us as volounteer!') }}</h2>
                </v-card-title>
                <v-card-text>
                    <p class="mb-3" style="font-weight: 500;">{{ $t("Join the movement for a greener future. Leave your details below — we'll reach out and welcome you aboard.") }}</p>
                    <v-form ref="form" v-model="isValid" class="d-flex flex-column">
                        <v-text-field v-model="formData.name" :placeholder="$t('Your Name')" variant="outlined" :rules="nameRules"></v-text-field>
                        <v-text-field v-model="formData.email" :placeholder="$t('Email')"  variant="outlined" :rules="emailRules"></v-text-field>
                        <v-text-field v-model="formData.phone" :placeholder="$t('Phone Number')" variant="outlined" :rules="phoneRules"></v-text-field>
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
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';

const props = defineProps(['vacancyId', 'disabled']);
const objectsStore = useObjects();
const { show, object, objects } = storeToRefs(objectsStore);
const formData = reactive({
    name: '',
    email: '',
    phone: '',
});

const nameRules = [
  v => !!v || 'Name is required',
  v => v.length >= 2 || 'Name must be at least 2 characters',
];

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];

const phoneRules = [
  v => !!v || 'Phone number is required',
  v => /^\+?[0-9\s\-()]{7,20}$/.test(v) || 'Phone number must be valid',
];

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

        const response = await axios.post(`http://localhost:5000/api/vacancies/${props.vacancyId}/Volunteers`, formData)
        for(let key in formData) {
            formData[key] = '';
        }

        dialog.value = false;
        notifications.show("Application received! Thank you.")
    })()
}
</script>
<style lang="scss">
.vol-form {
    width: 40vw;
    height: fit-content;
    position: fixed;
    padding: 1em;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
}
</style>