import LanguagePage from '@/screens/about/LanguagePage';
import React from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Language() {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    console.log("current language:"+currentLanguage);
    const changeLanguage = async (option: string) => {
        console.log("Changing language to:"+option);
        if (!option) return;
        const lng = option;
        await i18n.changeLanguage(lng);
        await AsyncStorage.setItem("language", lng);
    };    
    return (<LanguagePage language={currentLanguage} setLanguage={changeLanguage}/>);
}