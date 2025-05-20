import { computed, onMounted, onUnmounted, ref } from "vue"

export const useLoadingDots = () => {
    const amount = ref(0);
    let interval = null; 

    const dots = computed(() => '.'.repeat(amount.value));

    const start = () => interval = setInterval(iteration, 500);

    const stop = () => clearInterval(interval);

    const iteration = () => {
        if(++amount.value > 3) amount.value = 0;
    }

    onMounted(start);
    onUnmounted(stop);
    return {
        dots
    }
}