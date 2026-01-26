import SettingsPage from "@/screens/about/Settings";
import { AppContext } from "@/store/AppContext";
import { useContext, useState } from "react";

export default function Settings() {
    const [id, setId] = useState<string>("account");
    const {userType} = useContext(AppContext)!;
    return (<SettingsPage selectedId={id} setSelectedId = {setId} userType={userType}/>);
}