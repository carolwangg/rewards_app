import SettingsBusiness from "@/screens/business/SettingsBusiness";
import { AppContext } from "@/store/AppContext";
import { useContext } from "react";

export default function Settings() {
    const {userId, userType} = useContext(AppContext)!;
    console.log("userId parent:"+userType)
    return (<SettingsBusiness userId={userId}/>);
}