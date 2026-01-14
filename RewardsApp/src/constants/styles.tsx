import { Dimensions, StyleSheet } from "react-native"
import FONTS from "./fonts"
import COLOURS from "./colours"
export const UNIVERSAL_STYLES = StyleSheet.create({
    root: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: COLOURS.WHITE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        paddingTop: 30,
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "flex-start",
        rowGap: 20
    },
    bodyText: {
        fontFamily: FONTS.GOWUN_DODUM,
        fontSize: 18,
        color: COLOURS.BLACK
    },
    bodyTextLight: {
        fontFamily: FONTS.GOWUN_DODUM,
        fontSize: 18,
        color: COLOURS.DARK_GRAY
    },
    bodyTextSmall: {
        fontFamily: FONTS.GOWUN_DODUM,
        fontSize: 14,
        color: COLOURS.BLACK
    },
    h1Text: {
        fontFamily: FONTS.BALOO_BHAI_BOLD,
        fontSize: 36,
        color: COLOURS.DARK_BLUE
    },
    h2Text: {
        fontFamily: FONTS.BALOO_BHAI_BOLD,
        fontSize: 24,
        color: COLOURS.DARK_BLUE
    },
    h3Text: {
        fontFamily: FONTS.BALOO_BHAI,
        fontSize: 18,
        color: COLOURS.DARK_BLUE
    }
})