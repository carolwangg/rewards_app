import { View, Text, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import FONTS from "@/constants/fonts";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useEffect } from "react";
async function asyncTimeout(){
    setTimeout(()=>{router.back()}, 2000)
}
type Props = {
    message?: string
}
function getText(message: string | undefined){
    return message? message: 'Success :)'
}
export default function Success({message}: Props){
    useEffect(()=>{asyncTimeout();}, []); //mcgyver solution
    return <SafeAreaProvider>
        <SafeAreaView style = {styles.root}>
        <View style={{flex: 2, margin: 50}}>  
            <Text style = {{fontSize: 18, fontFamily: FONTS.GOWUN_DODUM}}>{getText(message)}</Text>
        </View>
            <LottieView
            source={require("@/assets/images/success-checkmark.json")}
            autoPlay
            loop
            style={styles.animation}
            />
    </SafeAreaView>
        </SafeAreaProvider>
}
const styles = StyleSheet.create({
    root: {
        display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
    },
    animation: {
        position:'absolute',
        top: 0,
        left: 0,
        flex: 6,
        width: '100%',
        height: '100%'
    }
})