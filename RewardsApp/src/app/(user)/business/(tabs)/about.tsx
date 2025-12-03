import ProfileBusiness from '@/screens/business/ProfileBusiness';
import ProfileCustomer from '@/screens/customer/ProfileCustomer';
import { useContext } from 'react';
import { AppContext } from "@/store/AppContext";

export default function Login() {
    const {userType, userId} = useContext(AppContext)!;
    
    console.log(userType);
    console.log(userId);
    if (userType == "customer") {
        return (<ProfileCustomer userId={userId}/>);
    } else {
        return (<ProfileBusiness userId={userId}/>);
    }
}