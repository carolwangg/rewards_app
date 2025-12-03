import { StyleSheet } from "react-native";
import FONTS from "@/constants/fonts";
import RedeemReward from "@/screens/business/RedeemReward";
import AddPoints from "@/screens/business/AddPoints"
import { useContext } from "react";
import { AppContext } from "@/store/AppContext";
import { useLocalSearchParams } from "expo-router";

export default function Cart () {
    const {userId} = useContext(AppContext)!;
    const {data} = useLocalSearchParams();
    const dataParsed = JSON.parse(data.toString());
    if ("reward_id" in dataParsed){
        return <RedeemReward userId={userId} data={dataParsed}></RedeemReward>
    }else {
        return <AddPoints userId={userId} data={dataParsed}></AddPoints>
    }    
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24, fontFamily: FONTS.BALOO_BHAI, fontWeight: 800, color: 'rgba(58, 73, 117, 1)'
    },
});