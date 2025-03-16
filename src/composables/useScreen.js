import { ScreenSize } from "@/utils/constants/screenSize.constants";
import { onMounted, onUnmounted, ref } from "vue";

export function useScreen() {
    const width = ref(window.innerWidth);
    const xs = computed(() => width.value < ScreenSize.xs);
    const sm = computed(() => width.value < ScreenSize.sm);
    const md = computed(() => width.value < ScreenSize.md);
    const lg = computed(() => width.value < ScreenSize.lg);

    function updateSize() {
        width.value = window.innerWidth;
    }

    onMounted(() => {
        window.addEventListener('resize', updateSize);
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateSize);
    })

    return {
        xs, sm, md, lg,
    }
}