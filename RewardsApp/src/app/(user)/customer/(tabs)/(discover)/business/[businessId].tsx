import BusinessInfo from "@/components/BusinessInfo";
import { AppContext } from "@/store/AppContext";
import { useLocalSearchParams } from 'expo-router';
import { useContext } from "react";
import Error from "@/components/Error";
export default function BusinessCard(){
    const {userId} = useContext(AppContext)!;
    const { businessId } = useLocalSearchParams();
    console.log("serving here");
    console.log("businessId:"+businessId);
    if ((typeof businessId) === 'string'){
        return <BusinessInfo customerId={userId} businessId={businessId}/>
    }else{
        return <Error/>
    }
    // const businessIdParsed = (Number)(businessId.toString())
    
    
}