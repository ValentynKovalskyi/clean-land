import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref, watchEffect } from "vue";

export const useObjects = defineStore('objectDetails', () => {
    const map = ref(null);
    const show = ref(false);
    const object = ref(null);
    const isForests = ref(true);
    const isPonds = ref(true);
    const searchValue = ref('');
    const rawForests = ref([]);
    const rawPonds = ref([]);
    const objects = ref([]); // 🔥 Тепер це звичайний ref, який будемо оновлювати вручну

    async function fetchData() {
        if (!rawForests.value.length) {
          const { data } = await axios.get("http://localhost:5000/api/Forest");
          rawForests.value = data;
        }
      
        if (!rawPonds.value.length) {
          const { data } = await axios.get("http://localhost:5000/api/Ponds");
          rawPonds.value = data;
        }
    }

    function updateObjects() {
        let result = [];

        if (isForests.value) result = result.concat(rawForests.value);
        if (isPonds.value) result = result.concat(rawPonds.value);

        if (searchValue.value) {
            result = result.filter(item =>
                item.name.toLowerCase().includes(searchValue.value.toLowerCase())
            );
        }

        objects.value = result;
        renderObjectsOnMap();
    }

    watchEffect(updateObjects);

    function renderObjectsOnMap() {
        if (!map.value) return;

        clearMap();

        objects.value.forEach(obj => {
            const marker = L.circle([obj.xLocation, obj.yLocation], {
                radius: 500,
                color: "green",
                fillColor: "#32a852",
                fillOpacity: 0.5
            });

            marker.addTo(map.value).bindPopup(obj.name);

            marker.on('click', () => showObject(obj))
        });
    }
    
    function toggleShow() {
        show.value = !show.value;
    }

    function showObject(obj) {
        object.value = obj;
        show.value = true;
    }

    function clearMap() {
        map.value.eachLayer(layer => {
            if (!layer._url) {
              map.value.removeLayer(layer);
            }
        });
    }

    return {
        map,
        show,
        object,
        isForests,
        isPonds,
        searchValue,
        objects,
        fetchData,
        toggleShow,
        showObject,
        clearMap,
    };
});
