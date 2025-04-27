<template>
    
      <v-window v-model="current" :show-arrows="false" class="mb-2">
        <v-window-item
          v-for="(item, i) in items"
          :key="i"
          :value="i"
          class="pa-5"
        >
        <v-card class="pa-4 problem-card">
          <div class="d-flex flex-column gap-2">
              {{ item.description }}
          </div>
        </v-card>
        </v-window-item>
      </v-window>
  
      <div class="d-flex justify-center align-center ga-2" v-if="items.length > 1">
        <v-btn
          icon="mdi-arrow-left"
          variant="outlined"
          size="small"
          :disabled="current === 0"
          @click="current--"
        ></v-btn>
  
        <span>{{ current + 1 }} / {{ items.length }}</span>
  
        <v-btn
          icon="mdi-arrow-right"
          variant="outlined"
          size="small"
          :disabled="current === items.length - 1"
          @click="current++"
        ></v-btn>
      </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
defineProps({
    items: {
      type: Array,
    }
  })
  
  const current = ref(0)
  </script>
  <style scoped lang="scss">
.problem-card {
  font-size: 1.1rem;
  border-radius: 1em;
  @include shadow(3px);
}
</style>
  