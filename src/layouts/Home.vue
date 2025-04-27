<template>
    <HomeHeader/>
    <div class="main">
        <RouterView/>
        <AdminPanel v-if="userStore.isAdmin" />
        <Chat v-else/>
    </div>
</template>

<script setup>
import AdminPanel from '@/components/admin/AdminPanel.vue';
import Chat from '@/components/chat/Chat.vue';
import { useObjects } from '@/stores/objectStore';
import { useUserStore } from '@/stores/userStore';
import HomeHeader from '@components/home/HomeHeader.vue';
import { onMounted } from 'vue';

const objectsStore = useObjects();
const userStore = useUserStore();
onMounted(async () => {
    await objectsStore.fetchData();
})
</script>
<style lang="scss">
.main {
    @include centered-flex;
    flex-direction: column;
    height: 100vh;
}

.ai-chat-button {
    position: absolute;
    bottom: 4em;
    right: 4em;
    z-index: 4;
}
</style>