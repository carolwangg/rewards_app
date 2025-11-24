import ProfileBusiness from '@/components/business/Profile_Business';
import ProfileCustomer from '@/components/customer/Profile_Customer';
import { useContext } from 'react';
import { AppContext } from "../AppContext";

export default function Login() {
    const {userType, setUserType} = useContext(AppContext)!;
    console.log(userType);
    if (userType == "customer") {
        return (<ProfileCustomer/>);
    } else {
        return (<ProfileBusiness/>);
    }
}