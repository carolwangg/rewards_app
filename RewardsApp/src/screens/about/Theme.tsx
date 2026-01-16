import DropdownComponent from "@/components/DropdownComponent";
import { SUPPORTED_THEMES } from "@/constants/constants";
import { UNIVERSAL_STYLES } from "@/constants/styles";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  theme: string,
  setTheme: Function
}

export default function ThemePage({theme, setTheme}: Props) {
  const {t} = useTranslation();
  const data: Array<Object> = []
  for (const key in SUPPORTED_THEMES){
    data.push({label: key, value: SUPPORTED_THEMES[key]})
  }
  return (
    <View style={UNIVERSAL_STYLES.root}>
      <View style={[UNIVERSAL_STYLES.body, {paddingTop: '10%'}]}>
        <View style={styles.container}>
          <Text style={UNIVERSAL_STYLES.bodyTextLight}>
            {t('settings.selectThemeLong')}
          </Text>
          <DropdownComponent data={data} value={theme} setValue={setTheme} placeholder={t('settings.selectTheme')} maxHeight={200} searchPlaceholder="Search themes..." style={{borderWidth: 1}}/>
        </View>        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
    width: '100%',
    height: 'auto',
  }
})