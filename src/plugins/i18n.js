import { Languages } from "@constants/languages.constants";
import { createI18n } from "vue-i18n";
import en from "../localizations/en.json"
import ua from "../localizations/ua.json"
import { useCookie } from "@/composables/useCookie";
import { Cookie } from "@constants/cookie.constants";

const { get, set } = useCookie();
const existingLang = get(Cookie.LANG);
console.log(existingLang)
let initLocale

if(existingLang && Object.values(Languages).includes(existingLang)) {
    initLocale = existingLang;
} else {
    initLocale = Languages.EN;
    set(Cookie.LANG, Languages.EN, { maxAge: 60 * 60 * 24 * 365 * 10});
}

export const i18n = createI18n({
    legacy: false,
    locale: initLocale,
    fallbackLocale: Languages.EN,
    messages: {
        en, ua
    }
})