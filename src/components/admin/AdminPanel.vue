<script setup lang="ts">
import AddPond from './AddPond.vue';
import DeletePond from './DeletePond.vue';
import ReportsView from './ReportsView.vue';

</script>

<template>
    <div class="ai-chat-button admin-panel">
        <AddPond />
        <DeletePond />
        <ReportsView />
    </div>
</template>
<style lang="scss">
.admin-panel {
    background-color: $color-5;
    padding: 1em;
    display: flex;
    gap: 0.5em;
    border-radius: 1em;
}
</style>