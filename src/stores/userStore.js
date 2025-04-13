import { computed } from "vue";
import { useObjects } from "./objectStore";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', () => {
    const objectsStore = useObjects();

    const isAdmin = computed({
        get: () => false,
        set: (value) => {
            if(value) {
                console.log("set as admin");
            }
        }
    });

    const setIsAdmin = (value) => {
        isAdmin.value = value;
    }

    return {
        isAdmin,
        setIsAdmin
    }
})