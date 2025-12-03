import { Business, CustomerReward } from "@/constants/interfaces";
import BusinessPopUp from "./BusinessPopUp";
import { Animated, StyleSheet, View, Pressable, Text, Easing } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
type Props = {
    business: Business,
    businessRewards: CustomerReward[]    
}


export default function AnimatedBusinessPopUp({business, businessRewards}: Props){
    const currentValue = useRef(new Animated.Value(0)).current;
    const [pressed, setPressed] = useState(false);
    const currentY = currentValue.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 0]
    })
    const expandAnimation = ()=>{
        Animated.timing(currentValue, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.in(Easing.bezier(.17,.67,.53,1.2))
        }).start();
    }
    const collapseAnimation = () => {
        Animated.timing(currentValue, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }
    
    // console.log("currentY:"+currentY)
    // console.log("currentValue:"+currentValue)
    useEffect(()=>{
        expandAnimation();
    }, []);
    return <View style={styles.root}>
        <Animated.View style={[{position: 'absolute', width: '100%', bottom: 0, height: '100%', borderWidth: 1,}, { transform: [{translateY: currentY}]}]}>
            <BusinessPopUp business={business} businessRewards={businessRewards}/>
        </Animated.View>
        </View>
    }
const styles=StyleSheet.create({
    root: {
        flex: 1,
        position: 'absolute',
        borderWidth: 1,
        overflow: 'hidden',
        width: '100%',
        height: 200,
        bottom: 0,
    }
})