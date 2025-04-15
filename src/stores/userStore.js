import { computed, ref } from "vue";
import { useObjects } from "./objectStore";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', () => {
    const objectsStore = useObjects();

    const isAdmin = ref(false);

    const setIsAdmin = (value) => {
        isAdmin.value = value;
        console.log("isAdmin", isAdmin.value);
    }

    return {
        isAdmin,
        setIsAdmin
    }
})