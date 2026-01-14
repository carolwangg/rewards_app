import LanguagePage from '@/screens/about/Language';
import React from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Language() {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const changeLanguage = async (option: string) => {
        if (!option) return;
        const lng = option;
        await i18n.changeLanguage(lng);
        await AsyncStorage.setItem("language", lng);
    };
    console.log("run language")
    console.log("changeLanguage:"+changeLanguage)
    return (<LanguagePage language={currentLanguage} setLanguage={changeLanguage}/>);
}