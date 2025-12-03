import Item from '@/components/Item';
import { CartContext } from '@/store/CartContext';
import { useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
export default function Reward() {
    const { reward } = useLocalSearchParams();
    const {cart, setCart, cardPoints} = useContext(CartContext)!;
    console.log(reward)
    return (<Item reward={JSON.parse(reward.toString())} cart={cart} setCart={setCart} cardPoints={cardPoints}/>);
}