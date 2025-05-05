import HomeView from "@/views/home/HomeView.vue"
import Home from "@layouts/Home.vue";
import About from "@/components/about/About.vue";
import HowToHelp from "@/components/about/HowToHelp.vue";
import Login from "@/views/auth/Login.vue";
import Vacancies from "@/views/home/Vacancies.vue";

export const RouteNames =  {
    MAIN: "main",
    ABOUT: "about",
    HOWTOHELP: "howtohelp",
    LOGIN: 'login',
    VACANCIES: 'vacancies'
}

export const routes = [
    {
        path: "/", component: Home,
        children: [
            { name: RouteNames.MAIN, path: '', component: HomeView },
            { name: RouteNames.ABOUT, path: '/about', component: About},
            { name: RouteNames.HOWTOHELP, path: '/howtohelp', component: HowToHelp},
            { name: RouteNames.LOGIN, path: '/login', component: Login},
            { name: RouteNames.VACANCIES, path: '/vacancies', component: Vacancies}
        ]
    },
]

