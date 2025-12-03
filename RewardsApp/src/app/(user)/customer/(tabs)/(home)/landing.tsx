import { AppContext } from '@/store/AppContext';
import { CartContext } from '@/store/CartContext';
import LandingBusiness from '@/screens/business/LandingBusiness';
import LandingCustomer from '@/screens/customer/LandingCustomer';
import { useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { useContext } from 'react';
import { View, Text } from 'react-native';
export default function Login() {
    const { isLoaded, user } = useUser();
    const {userType, userId} = useContext(AppContext)!;
    const {cart, setCart, setCardPoints, setCartReward} = useContext(CartContext)!;

    if (!isLoaded) return <View><Text>Loading user info ...</Text></View>

    console.log("user type:"+ userType)
    console.log("User info:");
    console.log(user?.emailAddresses[0]?.emailAddress);
    user?.fullName ? console.log(user.fullName) : console.log("No full name");
    user?.id ? console.log(user.id) : console.log("No user ID");
    user?.phoneNumbers[0]?.phoneNumber ? console.log(user?.phoneNumbers[0]?.phoneNumber) : console.log("No user phone number");
    
    const addEvent = () => {
        router.push('./item/add');
    }
    
    if (userType == "customer") {
        return (<LandingCustomer userId={userId} cart={cart} setCart={setCart} setCartReward={setCartReward} setCardPoints={setCardPoints}/>);
    } else {
        return (<LandingBusiness userId={userId} onPressFunction={addEvent}/>);
    }    
}