import DropdownComponent from "@/components/DropdownComponent";
import { SUPPORTED_LANGUAGES } from "@/constants/constants";
import { UNIVERSAL_STYLES } from "@/constants/styles";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  language: string,
  setLanguage: Function
}

export default function LanguagePage({language, setLanguage}: Props) {
  const {t} = useTranslation();
  const data: Array<Object> = []
  for (const key in SUPPORTED_LANGUAGES){
    data.push({label: key, value: SUPPORTED_LANGUAGES[key]})
  }
  return (
    <SafeAreaView style={UNIVERSAL_STYLES.root}>
      <View style={[UNIVERSAL_STYLES.body, {paddingTop: '10%'}]}>
        <View style={styles.container}>
          <Text style={UNIVERSAL_STYLES.bodyTextLight}>
            {t('settings.selectLanguageLong')}
          </Text>
          <DropdownComponent data={data} value={language} setValue={setLanguage} placeholder={t('settings.selectLanguage')} maxHeight={200} searchPlaceholder="Search languages..." style={{borderWidth: 1}}/>
        </View>        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
    width: '90%',
    height: 'auto',
  }
})