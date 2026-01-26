import { UNIVERSAL_STYLES } from "@/constants/styles";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AnalyticsPage(){
    const {t} = useTranslation();
    return <SafeAreaProvider>
        <View style={[UNIVERSAL_STYLES.root, {height: '100%', justifyContent: 'flex-start'}]}>
            <Text style={UNIVERSAL_STYLES.h1Text}>{t('comingSoon')}</Text>
        </View>
        </SafeAreaProvider>
}