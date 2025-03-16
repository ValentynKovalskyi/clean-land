<template>
    <div class="auth-form">
        <h2>{{ $t("Auth.signup") }}</h2>
        <v-form v-model="isValidForm" @submit.prevent>
            <v-text-field
            v-model="username"
            :label="$t('Auth.username')" 
            variant="outlined" 
            density="compact" 
            :rules="[validations.required, validations.minLength(4)]" />
            <v-text-field
            v-model="email" 
            :label="$t('Auth.email')" 
            variant="outlined" 
            density="compact" 
            type="email" 
            :rules="[validations.required, validations.email]" />
            <v-text-field
            v-model="password"
            :label="$t('Auth.password')" 
            variant="outlined" 
            density="compact" 
            type="password"
            :rules="[validations.required, validations.password]" />
            <v-text-field 
            :label="$t('Auth.confirmPassword')"  
            variant="outlined" 
            density="compact" 
            type="password" 
            :rules="[validations.required, validations.matchPassword(password)]" />
            <v-btn variant="outlined" type="submit" :loading="isSendingForm" :disabled="!isValidForm" @click.prevent="handleSubmit">{{ $t('Auth.submit') }}</v-btn>
        </v-form>
    </div>
</template>
<script setup>
import { register } from '@/api/auth.api';
import { validations } from '@constants/validations.constants';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isValidForm = ref();
const username = ref('');
const email = ref('');
const password = ref('');
const isSendingForm = ref(false);
const router = useRouter();

async function handleSubmit() {
    isSendingForm.value = true;
    const userData = {
        username: username.value,
        email: email.value,
        password: password.value,
    }
    const response = await register(userData);

    if(response.response.value.status === 200) {
        router.push("/home")
        isSendingForm.value = false;
    }
}
</script>
<style scoped lang="scss">

</style>