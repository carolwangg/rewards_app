import UpdateBusinessProfile from '@/screens/business/UpdateBusinessProfile';
import { AppContext } from '@/store/AppContext';
import { useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
export default function EditCard() {
    const { business } = useLocalSearchParams();
    const {userId} = useContext(AppContext)!;
    const businessParsed = JSON.parse(business?.toString());
    console.log("business top level:"+business)

    return (<UpdateBusinessProfile userId={userId} businessInterface={businessParsed}/>);
}