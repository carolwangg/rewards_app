import ProfileBusiness from '@/screens/business/ProfileBusiness';
import { useContext } from 'react';
import { AppContext } from "@/store/AppContext";

export default function Account() {
    const {userType, userId} = useContext(AppContext)!;
    console.log("userId:"+userId);
    return (<ProfileBusiness userId = {userId}/>);
}