import { useLoadingStore } from "@/stores/loading.store";
import { useNotificationStore } from "@/stores/notification.store";

export const useHandledAsync = () => {
    const loading = useLoadingStore()
    const { show } = useNotificationStore();

    function getActionWithHandling (callback) {
        return async function (...args) {
            loading.start();
            try {
                 return await callback(...args);
            } catch (e) {
                const errorMessage = e?.response?.data?.error 
                || e?.response?.data?.message 
                || e?.message 
                || 'Something went wrong';
                console.log(e);
                show(errorMessage, 'error');
            } finally {
                loading.stop();
            }
        }
    }

    return {
        getActionWithHandling
    }
}