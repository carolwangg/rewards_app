import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from 'expo-localization';
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from '@/assets/locales/en/translation.json'
import fr from '@/assets/locales/fr/translation.json'
import es from '@/assets/locales/es/translation.json'
import zh from '@/assets/locales/zh/translation.json'
import { FALLBACK_LANGUAGE_CODE } from "@/constants/constants";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
  zh: { translation: zh },
};

const getDeviceLanguage = async () => {
    return getLocales()[0].languageCode;
}

const getSavedLanguage = async () => {
    return AsyncStorage.getItem("language");
}

export const initI18n = async () => {
  const savedLanguage = await getSavedLanguage();
  const language = savedLanguage || await getDeviceLanguage();
  const processedLanguage = language? language: FALLBACK_LANGUAGE_CODE;
  if (!language) {console.log("No language found, defaulting to:"+FALLBACK_LANGUAGE_CODE)}
  else{console.log("language found:"+language)}
  i18n.use(initReactI18next).init({
    resources,
    lng: processedLanguage,
    fallbackLng: FALLBACK_LANGUAGE_CODE,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
};

export default i18n;