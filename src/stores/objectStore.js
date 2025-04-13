import axios from "axios";
import { defineStore } from "pinia";
import { computed, reactive, ref, watchEffect } from "vue";
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

        objects.value = result;
        renderObjectsOnMap();
    }

    watchEffect(updateObjects);

    function renderObjectsOnMap() {
        if (!map.value) return;

        clearMap();

        objects.value = objects.value.map(obj => {
            const marker = L.circle([obj.xLocation, obj.yLocation], {
                radius: 500,
                color: "green",
                fillColor: "#32a852",
                fillOpacity: 0.5
            });

            marker.addTo(map.value).bindPopup(obj.name);

            marker.on('click', () => showObject(obj))
            obj.mapMarker = marker;
            return obj;
        });
    }
    const searchSuggests = computed(() => {
        console.log("as")
            return objects.value
            .filter(item => item.name.toLowerCase().includes(searchValue.value.toLowerCase()))
    })

    function toggleShow() {
        show.value = !show.value;
    }

    function showObject(obj) {
        show.value = false;
        object.value = obj;
        map.value.flyTo(object.value.mapMarker.getLatLng(), 12, {
            animate: true,
            duration: 1,
            easeLinearity: 0.5,
        });
        show.value = true;
    }

    function clearMap() {
        map.value.eachLayer(layer => {
            if (!layer._url) {
              map.value.removeLayer(layer);
            }
        });
    }

    function updateMapToAdmin() {
        console.log("start")
        if(!map.value) return;
        console.log("update map to admin");
        map.value.on('click', (e) => {
            console.log(e.latlng);
        })
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
        searchSuggests,
        fetchData,
        toggleShow,
        showObject,
        clearMap,
        updateMapToAdmin
    };
});
