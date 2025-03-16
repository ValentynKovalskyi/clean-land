<template>
    <v-dialog v-model="dialog">
        <template v-slot:default="{ isActive }">
            <v-card class="custom-dialog" rounded="lg">
            <v-card-title>
                <h3>AI Assistant</h3>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <Message></Message>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn hide-details>
                    {{ $t("AI.Send") }}
                </v-btn>
                <v-text-field hide-details variant="outlined" :placeholder="$t('AskYourQuestion')">
                </v-text-field>
            </v-card-actions>
        </v-card>
        </template>
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-show="false" class="ai-chat-button" rounded="xl" size="x-large" v-bind="activatorProps">
                <v-icon icon="mdi-help-circle-outline">
                </v-icon>
            </v-btn>
        </template>
    </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { WebSocket } from 'ws';
const dialog = ref(false);



//const ws =WebSocket('ws://')
// Підключення до сервера WebSocket
const socket = new WebSocket('ws://192.168.47.115:8765');

socket.onopen = () => {
    console.log('Підключення до сервера WebSocket встановлено!');
};


</script>
<style scoped lang="scss">
.custom-dialog {
  position: absolute;
  bottom: 20px;
  right: 20px;
  margin: 0;
  width: 30vw;
  height: 30vw;
  transform: translateY(75%);
}

.ai-chat-button {
    z-index: 4;
    position: absolute;
    bottom: 2em;
    right: 2em;
}
</style>
