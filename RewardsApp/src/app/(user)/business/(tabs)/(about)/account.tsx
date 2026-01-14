import ProfileBusiness from '@/screens/business/ProfileBusiness';
import { useContext } from 'react';
import { AppContext } from "@/store/AppContext";

export default function About() {
    const {userType, userId} = useContext(AppContext)!;
    console.log(userType);
    return (<ProfileBusiness userId = {userId}/>);
}