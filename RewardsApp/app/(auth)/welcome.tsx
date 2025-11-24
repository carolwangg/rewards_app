import Welcome from "@/components/auth/Welcome";
import { router } from 'expo-router';
import { useContext } from "react";
import { AppContext } from "../AppContext";
export default function WelcomePage() {
  
    const {userType, setUserType}= useContext(AppContext)!;
    return <Welcome setChoice={(choice: string) => {setUserType(choice)}} toLogin={() => router.push('./sign-in')} />;
}