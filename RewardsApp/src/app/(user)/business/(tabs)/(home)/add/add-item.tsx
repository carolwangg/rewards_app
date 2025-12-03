import AddReward from "@/screens/business/AddReward";
import { AppContext } from "@/store/AppContext";
import { useContext } from "react";

export default function AddItem() {
    const {userId} = useContext(AppContext)!;
    return (<AddReward userId={userId}/>);
}