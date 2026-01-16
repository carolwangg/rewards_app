import { View, Text, TextInput, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native"
import FONTS from "@/constants/fonts";

type Props = {
  textStyle?: StyleProp<TextStyle>,
  contentContainerStyle?: StyleProp<ViewStyle>,
  textInputContainerStyle?: StyleProp<ViewStyle>,
  editing?: boolean,
  name: string, 
  placeHolder: string,
  value: string,
  setValue: (value: string) => void,
  maxLength?: number,
  noValuePlaceholder?: string
}

function renderName(name: string){
  if (name==="") return
  return <Text style={styles.name}>
                  {name}
                </Text>
}
export default function Editable({textStyle, textInputContainerStyle, contentContainerStyle, editing, name, placeHolder, value, setValue, maxLength, noValuePlaceholder}: Props) {
  const chosenLength = maxLength? maxLength: 100;
  if (!editing) {
        return <View style={[styles.root, contentContainerStyle]}>
                <View>{renderName(name)}</View>
                <View style={[styles.textInputBox, textInputContainerStyle, {backgroundColor: "transparent", borderWidth: 0}]}>
                  <Text style={[styles.textInput, textStyle]}>{!value && noValuePlaceholder? noValuePlaceholder : value}</Text>
                </View>
            </View>
    }
    return <View style={[styles.root, contentContainerStyle]}>
              <View>{renderName(name)}</View>
              <View style={[styles.textInputBox, textInputContainerStyle]}>
                <TextInput maxLength={chosenLength} style={[styles.textInput, textStyle]} placeholder = {placeHolder} value={value} onChangeText={(text: string)=>{console.log("change value"); setValue(text)}}/>
              </View>
            </View>
}
const styles = StyleSheet.create({
root: {
    display: 'flex',
    flexDirection: 'row',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    columnGap: 10,
    boxSizing: 'border-box',
  },
  name: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  textInput: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  textInputBox: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    borderRadius: 15,
    backgroundColor: 'rgba(109, 109, 109, 0.34)',
    borderWidth: 1,
    boxSizing: 'border-box',
    flex: 1
  },
});