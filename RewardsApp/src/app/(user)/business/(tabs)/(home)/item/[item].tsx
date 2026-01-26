import Item from '@/components/Item';
import { AppContext } from '@/store/AppContext';
import { CartContext } from '@/store/CartContext';
import { useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
export default function Reward() {
    const {userId} = useContext(AppContext)!;
    const { reward } = useLocalSearchParams();
    const { cart, setCart } = useContext(CartContext)!;
    console.log("wee woo")
    console.log(reward)
    console.log('CartContext in route', { cart, setCart, typeofSetCart: typeof setCart });
    return (<Item userId={userId} reward={JSON.parse(reward.toString())} cart={cart} setCart={setCart}/>);
}