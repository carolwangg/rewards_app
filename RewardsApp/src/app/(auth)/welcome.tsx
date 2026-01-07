import Welcome from "@/screens/auth/Welcome";
import { AppContext } from "@/store/AppContext";
import { router } from 'expo-router';
import { useContext } from "react";
export default function WelcomePage() {
    const {setUserType}= useContext(AppContext)!;
    const toLoginFunction = () => {
        router.push('./sign-in')
    }
    return <Welcome setChoice={(choice: string) => {setUserType(choice);}} toLogin={toLoginFunction} />;
}