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
            <div v-for="n in 3" :key="n">
              {{ item }}
            </div>
          </div>
        </v-card>
        </v-window-item>
      </v-window>
  
      <div class="d-flex justify-center align-center ga-2">
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
  
  const items = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.',
    'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    'Integer euismod, sapien nec consequat porta, orci augue fermentum nisi.'
  ]
  
  const current = ref(0)
  </script>
  <style scoped lang="scss">
.problem-card {
  font-size: 1.1rem;
  border-radius: 1em;
  @include shadow(3px);
}
</style>
  