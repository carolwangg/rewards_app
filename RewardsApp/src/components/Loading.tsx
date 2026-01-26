import COLOURS from "@/constants/colours"
import { UNIVERSAL_STYLES } from "@/constants/styles"
import LottieView from "lottie-react-native"
import { StyleSheet, View, Text } from "react-native"
type Props = {
    message?: string
}
export default function Loading({message}: Props){
    return <View style={styles.root}>
                <Text style={UNIVERSAL_STYLES.bodyText}>{message}</Text>
                <LottieView
                source={require("@/assets/images/loading.json")}
                loop
                autoPlay
                style={styles.animation}
                />
            </View>
}
const styles = StyleSheet.create({
    root:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOURS.WHITE
    },
    animation: {
        width: 400,
        height: 400,
    }
})