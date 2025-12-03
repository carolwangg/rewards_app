import { StyleSheet, View, Text, Pressable, ViewStyle, TextStyle } from "react-native"
import FONTS from "@/constants/fonts"
import { StyleProp } from "react-native"
type Props = {
    contentContainerStyle?: StyleProp<ViewStyle>
    headerTextStyle?: StyleProp<TextStyle>
    headerText: string,
}
export default function Header({contentContainerStyle, headerTextStyle, headerText}: Props){
    return <View testID="175:429" style={[styles.headerRow, contentContainerStyle]}>
                <Text testID="175:430" style={[styles.headerText, headerTextStyle]}>
                    {headerText}
                </Text>
            </View>
}
const styles = StyleSheet.create({
    headerText: {
    color: 'rgba(28, 39, 76, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  seeAllText: {
    color: 'rgba(28, 39, 76, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  headerRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});