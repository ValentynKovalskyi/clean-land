<template>
    <header>
        <div class="nav-div">
            <div class="logo-container">
                <h1>Edu Next</h1>
            </div>
            <div class="right-side-control">
                <LangSwitcher/>
                <RouterLink :to="authToggle.link">
                    <v-btn variant="outlined">
                        {{ $t(authToggle.text) }}
                    </v-btn>
                </RouterLink>
            </div>
        </div>
    </header>
</template>
<script setup>
import { RouteNames} from "@constants/routes.constants.js"
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import LangSwitcher from "@components/lang/LangSwitcher.vue";

const route = useRoute();
const router = useRouter();
const authToggle = computed(() => {
    if(route.name === RouteNames.REGISTER) {
        return {
            text: "Auth.signin",
            link: "/auth/login"
        }
    } else {
        return {
            text: "Auth.signup",
            link: "/auth/register"
        }
    }
})
</script>
<style scoped lang="scss">
.nav-div {
    @include navigation-flex;
    .logo-container {
        width: 100%;
        display: flex;
        justify-content: start;
        h1 {
            margin-left: 2em;
        }
    }
    .right-side-control {
        margin: 2em;
        display: flex;
        align-items: center;
        gap: 1em;
        a {
            color: inherit;
        }
    }
}
</style>