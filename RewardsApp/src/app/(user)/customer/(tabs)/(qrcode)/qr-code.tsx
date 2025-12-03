import QRcodeCustomer from "@/screens/customer/QrCodeCustomer";
import { CartContext } from "@/store/CartContext";
import { useContext } from "react";
import { AppContext } from "@/store/AppContext";
export default function QrCode(){
    const {userId} = useContext(AppContext)!;
    const {cart, cartReward} = useContext(CartContext)!;
    
    let data;
    if (cart !== "reward_0" && cartReward !== null){
        data = {
            customer_id: userId,
            reward_id: cart,
            reward_name: cartReward.name
        }
    }else{
        data = {
            customer_id: userId,
        }
    }
    return <QRcodeCustomer data={data}/>
}