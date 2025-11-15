import Landing_Business from '@/components/Landing_Business';
import Landing_Customer from '@/components/Landing_Customer';
import { useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
const type_: "business" |  "customer" = "business";
export default function Login() {
    const { user } = useUser();
    console.log("User info:");
    console.log(user?.emailAddresses[0]?.emailAddress);
    user?.fullName ? console.log(user.fullName) : console.log("No full name");
    user?.id ? console.log(user.id) : console.log("No user ID");
    user?.phoneNumbers[0]?.phoneNumber ? console.log(user?.phoneNumbers[0]?.phoneNumber) : console.log("No user phone number");
    
    const addEvent = () => {
        router.push('/(tabs)/(home)/add-item');
    }

    
    if (type_ == "customer") {
        return (<Landing_Customer/>);
    } else {
        return (<Landing_Business onPressFunction={addEvent}/>);
    }    
}