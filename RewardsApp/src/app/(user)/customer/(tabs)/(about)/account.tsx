import ProfileCustomer from '@/screens/customer/ProfileCustomer';
import { useContext } from 'react';
import { AppContext } from "@/store/AppContext";

export default function About() {
    const {userType, userId} = useContext(AppContext)!;
    console.log(userType);
    return (<ProfileCustomer userId = {userId}/>);
}