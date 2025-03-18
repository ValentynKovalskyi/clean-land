<template>
    <div ref="mapContainer" class="map"></div>
</template>
<script setup>
  import { onMounted, ref } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { useObjectDetails } from '@/stores/objectDetailsState';
  import { useFetch } from '@/composables/useFetch';
  import mockData from "@/api/mock/forests.mock.json"
  import { useSearchStore } from '@/stores/useSearchStore';
import { storeToRefs } from 'pinia';

  const mapContainer = ref(null);
  const { toggleShow, showObject, setObjects, setMap } = useObjectDetails()
  const { get, response, responseData } = useFetch()
  const searchStore = useSearchStore();
  const { searchValue } = storeToRefs(searchStore);

  onMounted(async () => {
    const map = L.map(mapContainer.value, { zoomControl: false }).setView([49.234, 28.445], 10);
    setMap(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    let ponds = []
/*     await get('http://192.168.234.128:5000/api/Forest');
    ponds = ponds.concat(responseData.value);
    await get('http://192.168.234.128:5000/api/Ponds');
    ponds = ponds.concat(responseData.value); */

    /* if(true) {
      const objects = mockData.map((forest) => {
        const circle = L.circle([forest.xLocation, forest.yLocation], {
    color: 'red',
    fillColor: '#FF0000',
    fillOpacity: 0.4,
    radius: 1000
    }).addTo(map)
    circle.on('click', () => show(forest))
      })
      return
    } */

    const objects = ponds.map((pond) => {
    const circle = L.circle([pond.xLocation, pond.yLocation], {
    color: 'red',
    fillColor: '#FF0000',
    fillOpacity: 0.3,
    radius: 500
    }).addTo(map)
    circle.on('click', () => showObject(pond))
    return {
      object: pond,
      circle
    }
  })

setObjects(objects);




/*     // Додаємо коло
   const circle = L.circle([49.250, 28.425], {
    color: 'red',
    fillColor: '#FF0000',
    fillOpacity: 0.4,
    radius: 1000 // Радіус у метрах
  }).addTo(map)
 */

  });
  </script>
  
  <style scoped>
  .map {
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }
  </style>
  