import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@constants/routes.constants";

export const router = createRouter({
    history: createWebHistory(),
    routes
})