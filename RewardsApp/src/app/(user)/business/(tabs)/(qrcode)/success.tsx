import Success from "@/components/Success";
import { useLocalSearchParams } from "expo-router";
export default function SuccessScreen(){
    const {message} = useLocalSearchParams();
    return <Success message={message.toString()}/>
}