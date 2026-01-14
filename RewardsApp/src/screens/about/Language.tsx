import DropdownComponent from "@/components/DropdownComponent";
import { SUPPORTED_LANGUAGES } from "@/constants/constants";
import { UNIVERSAL_STYLES } from "@/constants/styles";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  language: string,
  setLanguage: Function
}

export default function LanguagePage({language, setLanguage}: Props) {
  
  const data: Array<Object> = []
  for (const key in SUPPORTED_LANGUAGES){
    data.push({label: key, value: SUPPORTED_LANGUAGES[key]})
  }
  console.log("setlanguage here:"+setLanguage)
  return (
    <View style={UNIVERSAL_STYLES.root}>
      <View style={UNIVERSAL_STYLES.body}>
        <View style={styles.container}>
          <Text style={UNIVERSAL_STYLES.bodyTextLight}>
            {`Select the language for Zinks to use`}
          </Text>
          <DropdownComponent data={data} value={"en"} setValue={(value: string)=>{}} placeholder="Select Language" maxHeight={200} searchPlaceholder="Search languages..." style={{borderWidth: 1}}/>
        </View>        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
    width: '100%',
    height: 'auto'
  }
})