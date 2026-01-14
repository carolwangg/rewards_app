import { AppContext } from '@/store/AppContext';
import { CartContext } from '@/store/CartContext';
import LandingBusiness from '@/screens/business/LandingBusiness';
import LandingCustomer from '@/screens/customer/LandingCustomer';
import { useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { useContext } from 'react';
import { View, Text } from 'react-native';
import Loading from '@/components/Loading';
export default function Login() {
    const { isLoaded, user } = useUser();
    const {userType, userId, setUserId} = useContext(AppContext)!;
    const {cart, setCart, setCardPoints} = useContext(CartContext)!;

    if (!isLoaded) return <Loading message="Loading business data"/>
    if (userId === undefined && user){setUserId(user.id)} //mcgyver solution
    console.log("user type:"+ userType)
    console.log("User info:");
    console.log(user?.emailAddresses[0]?.emailAddress);
    user?.id ? console.log(user.id) : console.log("No user ID");
    
    const addEvent = () => {
        router.push(`./add`);
    }
    
    return (<LandingBusiness userId={userId} onPressFunction={addEvent}/>);  
}