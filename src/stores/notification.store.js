import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useNotificationStore = defineStore("notification", () => {
    const queue = ref([]);
    const lastId = ref(0);

    const show = (msg, msgType = "success") => {
        const notification = {
            id: lastId.value++,
            msg: msg,
            msgType: msgType
        };
        queue.value.push(notification);
        setTimeout(() => hide(notification.id), 5000);
    };

    const hide = (notificationId) => {
        queue.value = queue.value.filter((notification) => {
            return +notification.id !== +notificationId
        });
    }
    
    watchEffect(() => {
        if(queue.value.length > 4) queue.value.shift();
    })
    return {
        queue,
        show,
        hide
    }
})