<template>
    <div class="auth-form">
        <h2>{{ $t('Auth.Login') }}</h2>
        <v-form>
            <v-text-field
            v-model="email"
            :label="$t('Auth.email')" 
            variant="outlined" 
            density="compact" 
            type="email"></v-text-field>
            <v-text-field
            v-model="password"
            :label="$t('Auth.password')" 
            variant="outlined" 
            density="compact" 
            type="password"></v-text-field>
            <v-btn variant="outlined" :loading="isSendingForm" @click="handleLogin()">{{ $t('Auth.Login') }}</v-btn>
        </v-form>
    </div>
</template>
<script setup>
import { useFetch } from '@/composables/useFetch';
import { useUserStore } from '@/stores/userStore';
import { validations } from '@constants/validations.constants';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const isValidForm = ref(true);
const email = ref('');
const password = ref('');
const isSendingForm = ref(false);
const router = useRouter()

async function handleLogin() {
    if(isValidForm) {
        isSendingForm.value = true;
        const loginData = {
            userName: email.value,
            password: password.value,
        }
        const response = await axios.post('http://localhost:5000/api/Users/login', loginData)
        if(response.status === 200) {
            userStore.setIsAdmin(true)
            router.push('/');
        }
        isSendingForm.value = false;
    }
}
// ---> to be implemented
</script>
<style scoped lang="scss">

</style>