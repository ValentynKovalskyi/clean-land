import HomeView from "@/views/home/HomeView.vue"
import Home from "@layouts/Home.vue";
import ListView from "@views/home/ListView.vue";
import About from "@/components/about/About.vue";
import HowToHelp from "@/components/about/HowToHelp.vue";
import Login from "@/views/auth/Login.vue";

export const RouteNames =  {
    MAIN: "main",
    MAPVIEW: "mapview",
    LISTVIEW: "listview",
    ABOUT: "about",
    HOWTOHELP: "howtohelp",
    LOGIN: 'login',
}

export const routes = [
    {
        name: RouteNames.MAIN,
        path: "/", component: Home,
        children: [
            { name: RouteNames.MAPVIEW, path: '', component: HomeView },
            { name: RouteNames.LISTVIEW, path: '/listview', component: ListView },
            { name: RouteNames.ABOUT, path: '/about', component: About},
            { name: RouteNames.HOWTOHELP, path: '/howtohelp', component: HowToHelp},
            { name: RouteNames.LOGIN, path: '/login', component: Login},
        ]
    },
]

