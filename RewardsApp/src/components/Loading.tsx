import LottieView from "lottie-react-native"
import { StyleSheet, View } from "react-native"
export default function Loading(){
    return <View style={styles.root}>
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
    },
    animation: {
        width: '200%',
        height: '200%',
    }
})