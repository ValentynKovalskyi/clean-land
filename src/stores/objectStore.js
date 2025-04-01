import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref, watchEffect } from "vue";
import mock from '@/api/mock/mock.json'
import { Ecosystem } from "@/utils/constants/ecosystem.contants";

export const useObjects = defineStore('objectDetails', () => {
    const map = ref(null);
    const show = ref(false);
    const object = ref(null);
    const isForests = ref(true);
    const isPonds = ref(true);
    const searchValue = ref('');
    const filters = ref([])
    const rawForests = ref([]);
    const rawPonds = ref([]);
    const objects = ref([]); 

    async function fetchData() {
        if (!rawForests.value.length) {
          const { data } = await axios.get("http://localhost:5000/api/Forest");
          rawForests.value = data;
          rawForests.value.push(mock[0])
        }

        if (!rawPonds.value.length) {
          const { data } = await axios.get("http://localhost:5000/api/Ponds");
          rawPonds.value = data;
          rawPonds.value.push(mock[1]);
        }
    }

    function updateObjects() {
        let result = [];
        console.log(filters.value);
        if (filters.value.includes(Ecosystem.FOREST)) result.push(...rawForests.value);
        if (filters.value.includes(Ecosystem.POND)) result.push(...rawPonds.value);

        if(!filters.value.length) {
            result.push(...rawForests.value);
            result.push(...rawPonds.value);
        }

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
        show.value = false;
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
        filters,
        objects,
        fetchData,
        toggleShow,
        showObject,
        clearMap,
    };
});
