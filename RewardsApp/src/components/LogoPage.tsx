import { Image } from "expo-image";
import { View, StyleSheet } from "react-native"
export default function LogoPage(){
    return <View style={styles.root}>  
        <Image source={require("@/assets/images/zinks.png")} style={styles.image}/>
        </View>
}
const styles = StyleSheet.create({
    root: {
        display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#3A4975'
    },
    image:{
        width: 140,
        height: 140,
    }
});