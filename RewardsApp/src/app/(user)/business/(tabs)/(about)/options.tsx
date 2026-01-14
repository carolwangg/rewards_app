import SettingsPage from "@/screens/about/Settings";
import { useState } from "react";

export default function Settings() {
    const [id, setId] = useState<string>("account");
    return (<SettingsPage selectedId={id} setSelectedId = {setId}/>);
}