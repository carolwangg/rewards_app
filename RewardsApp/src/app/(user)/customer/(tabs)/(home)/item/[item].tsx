import Item from '@/components/Item';
import { CartContext } from '@/store/CartContext';
import { useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
export default function Reward() {
    const { reward } = useLocalSearchParams();
    const { cart, setCart } = useContext(CartContext)!;
    console.log("wee woo")
    console.log(reward)
    console.log('CartContext in route', { cart, setCart, typeofSetCart: typeof setCart });
    return (<Item reward={JSON.parse(reward.toString())} cart={cart} setCart={setCart}/>);
}