import { useContext } from 'react';
import { AppContext } from "@/store/AppContext";
import SettingsCustomer from '@/screens/customer/SettingsCustomer';

export default function Settings() {
    const {userType, userId} = useContext(AppContext)!;
    console.log(userType);
    return (<SettingsCustomer userId = {userId}/>);
}