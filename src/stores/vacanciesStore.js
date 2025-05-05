import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import vacanciesMock from "@/api/mock/vacancies.json";

export const useVacanciesStore = defineStore('vacancies', () => {
    const vacancies = ref([]);
    const searchValue = ref('');

    async function fetchVacancies () {
        try {
            const response = await axios.get("http://localhost:5000/api/Vacancies");
            vacancies.value = response.data;
        } catch (e) {

        }
        vacancies.value.push(...vacanciesMock)
        console.log(vacanciesMock)
    }

    const searchVacancies = computed(() => {
        return vacancies.value.filter((v) => {
            return v.title.toLowerCase().includes(searchValue.value.toLowerCase());
        }) 
    })

    return {
        searchValue,
        fetchVacancies,
        searchVacancies,
    }
});