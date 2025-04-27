<template>
    <v-dialog v-model="show" max-width="60vw" max-height="80vh" roundered="xl" class="blurred-overlay">
        <v-card class="details details--dialog">
            <DetailsContent />
        </v-card>
    </v-dialog>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import DetailsContent from './DetailsContent.vue';
import { useObjects } from '@/stores/objectStore';

const { show } = storeToRefs(useObjects());
</script>