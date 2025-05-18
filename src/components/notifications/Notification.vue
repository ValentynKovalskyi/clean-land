<template>
    <div 
        class="notification" 
        :class="[`notification--${notification.msgType}`]" :data-testid="`toast-${notification.msgType}`">
        <span class="notification__text" v-title>{{ notification.msg }}</span>
        <button class="button--flat notification__btn" @click="hide(notification.id)">×</button>
    </div>
</template>
<script setup>
import { useNotificationStore } from '@/stores/notification.store';

defineProps({
    notification: {
        type: Object,
        required: true,
    }
})
const { hide } = useNotificationStore();
</script>