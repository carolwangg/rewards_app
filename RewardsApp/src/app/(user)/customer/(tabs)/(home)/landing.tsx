import { AppContext } from '@/store/AppContext';
import { CartContext } from '@/store/CartContext';
import LandingCustomer from '@/screens/customer/LandingCustomer';
import { useUser } from '@clerk/clerk-expo';
import { useContext } from 'react';
import Loading from '@/components/Loading';
export default function Login() {
    const { isLoaded, user } = useUser();
    const {userType, userId} = useContext(AppContext)!;
    const {cart, setCart, setCardPoints, setCartReward} = useContext(CartContext)!;

    if (!isLoaded) return <Loading message="Loading customer data"/>

    console.log("user type:"+ userType)
    console.log("User info:");
    console.log(user?.emailAddresses[0]?.emailAddress);
    user?.id ? console.log(user.id) : console.log("No user ID");
    
    return (<LandingCustomer userId={userId} cart={cart} setCart={setCart} setCartReward={setCartReward} setCardPoints={setCardPoints}/>);

}