import { AppContext } from '@/store/AppContext';
import { CartContext } from '@/store/CartContext';
import LandingBusiness from '@/screens/business/LandingBusiness';
import { useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { useContext } from 'react';
import Loading from '@/components/Loading';
export default function Login() {
    const { isLoaded } = useUser();
    const {userId} = useContext(AppContext)!;

    if (!isLoaded) return <Loading message="Loading business data"/>    
    const addEvent = () => {
        router.push(`./add`);
    }
    console.log("userId:"+userId)
    return (<LandingBusiness userId={userId} onPressFunction={addEvent}/>);  
}