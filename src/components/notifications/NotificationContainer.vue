<template>
    <Teleport to="body">
        <TransitionGroup tag="div" name="notification" class="notification-container" data-testid="toast-container">
            <Notification 
            v-for="notification of notificationStore.queue"
            :notification="notification" 
            :key="notification.id"/>
        </TransitionGroup>
    </Teleport>
</template>
<script setup>
import { useNotificationStore } from '@/stores/notification.store';
import Notification from '@/components/notifications/Notification.vue';

const notificationStore = useNotificationStore();
</script>
<style lang="scss">
.notification {
    display: flex;
    flex-direction: row;
    justify-content:  space-between;
    gap: 1em;
    padding: 1em;
    width: 100%;
    border-radius: 0.5em;
    font-size: 1rem;
    pointer-events: auto;
    &--success {
        background-color: #e8f5e9;
        color: #388e3c;
    }
    &--error {
        background-color: #ffebee;
        color: #c62828;
    }
    &__text {
        @include text-ellipsis;
    }
    &__btn {
        font-size: 2rem;
        cursor: pointer;
    }
}

.notification-container {
    pointer-events: none;
    position: fixed;
    top: 1em;
    right: 2em;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 1em;
    background: transparent;
    height: 50vh;
    width: 20vw;
}

.notification-move,
.notification-enter-active,
.notification-leave-active {
    transition: all 0.2s ease;
}

.notification-enter-from {
  transform: translateX(150%);
}

.notification-leave-to {
    transform: translateX(150%);
}

.notification-leave-active {
    position: absolute;
  }
</style>