<template>
    <header>
        <div class="nav-div">
            <div class="logo-container"></div>
            <div class="central-div">
<!--                 <v-btn variant="plain" prepend-icon="mdi-alert-circle-outline" @click="router.push('/about')">
                    <span class="underline-nav-btn">{{ $t('Home.About') }}</span>
                </v-btn> -->
            </div>
            <div class="right-side-control">
<!--                 <template v-if="route.name === RouteNames.MAPVIEW || route.name === RouteNames.LISTVIEW">
                    <v-btn v-if="isMapView" prepend-icon="mdi-format-list-bulleted" @click="router.push('/listview')">
                        {{ $t("ListView") }}
                    </v-btn>
                    <v-btn v-else prepend-icon="mdi-map" @click="router.push('/')">
                        {{ $t("MapView") }}
                    </v-btn>
                </template> -->
                <v-btn text variant="plain" prepend-icon="mdi-map" @click="router.push('/')">
                    <span class="underline-nav-btn">{{ $t('Home.Map') }}</span>
                </v-btn>
                <v-btn variant="plain" prepend-icon="mdi-account" @click="router.push('/login')">
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

const isMapView = computed(() => {
    return route.name === RouteNames.MAPVIEW
})
</script>
<style scoped lang="scss">

.nav-div {
    @include navigation-flex;
    position: absolute;
    background-color: $color-5;
    width: 100%;
    z-index: 3;

    .logo-container {
        @include centered-flex;
        width: fit-content;
        text-wrap: nowrap;
        background-image: url('/public/little-logo.svg');
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: contain;
        margin-left: 2em;
        width: 10rem;
        height: 80%;
        h1 {
            margin-left: 2em;
        }
    }
    .central-div {
        @include centered-flex;
        width: 20%;
        height: 100%;
        justify-content: space-between;
    }

    .right-side-control {
        @include centered-flex;
        margin: 2em;
        display: flex;
        align-items: center;
        gap: 2em;
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
.underline-nav-btn:hover {
            text-decoration: underline
        }
</style>
