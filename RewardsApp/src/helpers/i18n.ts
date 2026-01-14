import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from 'expo-localization';
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from '@/assets/locales/en/translation.json'
import fr from '@/assets/locales/fr/translation.json'
import es from '@/assets/locales/es/translation.json'
import zh from '@/assets/locales/zh/translation.json'

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
  const processedLanguage = language? language: undefined;
  
  i18n.use(initReactI18next).init({
    resources,
    lng: processedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
};

export default i18n;