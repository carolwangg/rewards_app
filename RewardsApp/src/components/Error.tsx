import COLOURS from "@/constants/colours"
import FONTS from "@/constants/fonts"
import { StyleSheet, View, Text } from "react-native"
type Props = {
    error?: string
    code?: number
}
export default function Error({error, code}: Props){
    return <View style={styles.root}>
                <Text style={styles.heading}>{`${code? code + ' ': ''}Error`}</Text>
                <Text style={styles.body}>{error}</Text>
            </View>
}
const styles = StyleSheet.create({
    root:{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginTop: 100
    },
    heading: {
        fontSize: 48,
        color: COLOURS.RED,
        fontFamily: FONTS.BALOO_BHAI_BOLD
    },
    body: {
        fontSize: 18,
        color: COLOURS.DARK_GRAY,
        fontFamily: FONTS.GOWUN_DODUM
    }
})