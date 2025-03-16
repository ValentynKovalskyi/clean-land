<template>
    <v-select 
    v-model="$i18n.locale"
    prepend-icon="mdi-web"
    :items="locales"
    item-title="title"
    item-value="value"
    variant="plain" 
    density="compact" 
    hide-details></v-select>
</template>
<script setup>
import { useCookie } from '@/composables/useCookie';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Cookie } from '@constants/cookie.constants';
const { availableLocales, t, locale } = useI18n();
const { set } = useCookie();

const locales = computed( () => {
    return availableLocales.map((l) => {
        return {
            title: t(l),
            value: l
        }
    })
})

watch(locale, () => set(Cookie.LANG, locale.value, { maxAge: 60 * 60 * 24 * 365 * 10}))
</script>
<style scoped>
.v-select {
   min-width: 10em;
}
</style>