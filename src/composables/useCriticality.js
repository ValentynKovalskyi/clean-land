import { computed, ref } from "vue";

export const useCriticality = (criticalityValue) => {
    const criticalityMax = ref(6);
    const criticality = computed(() => Math.round(criticalityValue.value / 10 * criticalityMax.value))
    const criticityColor = computed(() => {
        if(criticality.value > 4) return "red";
        else if(criticality.value > 2) return "yellow";
        else return "green";
    })
    return {
        criticality,
        criticalityMax,
        criticityColor,
    }
}