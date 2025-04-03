<template>
    <header>
        <div class="header">
            <div class="header__logo"></div>
            <div class="header__nav">
                <v-btn v-for="navBtn in navigationButtons" 
                :key="name" 
                text 
                variant="plain" 
                :prepend-icon="navBtn.icon" 
                @click="router.push(navBtn.route)">
                    <span class="header__nav__btn" :class="{'header__nav__btn--currentRoute': route.name === navBtn.name}">{{ $t(navBtn.translation) }}</span>
                </v-btn>
            </div>
            <div class="header__rightControl">
<!--                 <template v-if="route.name === RouteNames.MAPVIEW || route.name === RouteNames.LISTVIEW">
                    <v-btn v-if="isMapView" prepend-icon="mdi-format-list-bulleted" @click="router.push('/listview')">
                        {{ $t("ListView") }}
                    </v-btn>
                    <v-btn v-else prepend-icon="mdi-map" @click="router.push('/')">
                        {{ $t("MapView") }}
                    </v-btn>
                </template> -->
                <v-btn variant="plain" prepend-icon="mdi-account-circle-outline" @click="router.push('/login')">
                    <span class="underline-nav-btn">{{ $t('Auth.Login') }}</span>
                </v-btn>
                <LangSwitcher/>
            </div>
        </div>
    </header>
</template>
<script setup>
import { RouteNames, routes } from "@/utils/constants/routes.constants";
import LangSwitcher from "@components/lang/LangSwitcher.vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const route = useRoute()
const router = useRouter();

const navigationButtons = [
    {
        name: RouteNames.MAIN,
        route: '/',
        icon: 'mdi-map',
        translation: 'Home.Map'
    },
    {
        name: RouteNames.HOWTOHELP,
        route: '/howtohelp',
        icon: 'mdi-help-circle-outline',
        translation: 'Home.HowToHelp'
    },
    {
        name: RouteNames.VACANCIES,
        route: '/vacancies',
        icon: 'mdi-briefcase-variant-outline',
        translation: 'Home.Vacancies'
    },
    {
        name: RouteNames.ABOUT,
        route: '/about',
        icon: 'mdi-alert-circle-outline',
        translation: 'Home.About'
    },
]
</script>
<style scoped lang="scss">

.header {
    height: 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
    @include shadow;
    position: absolute;
    background-color: $color-5;
    width: 100%;
    z-index: 3;

    &__logo {
        @include centered-flex;
        text-wrap: nowrap;
        background-image: url('little-logo.svg');
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: contain;
        margin-left: 4em;
        height: 80%;
        flex-grow: 10;
        flex-basis: 20vw
    }
    &__nav {
        @include centered-flex;
        height: 100%;
        width: 100%;
        justify-content: start;
        gap: 4em;
        padding: 0 4em;
        flex-grow: 5;
        &__btn {
            &--currentRoute, &:hover {
                text-decoration: underline;
            }
        }
    }

    &__rightControl {
        @include centered-flex;
        margin: 2em;
        display: flex;
        align-items: center;
        gap: 2em;
        flex-grow: 1;
        a {
            color: inherit;
        }
    }

}
/* .underline-nav-btn::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: blue;
  transition: width 0.3s;
}
.underline-nav-btn:hover::after {
  width: 100%;
}
 */
</style>
