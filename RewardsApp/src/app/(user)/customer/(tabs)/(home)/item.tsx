import Item from '@/components/Item';
import { AppContext } from '@/store/AppContext';
import { useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
export default function Reward() {
    const {userId} = useContext(AppContext)!;
    const { reward } = useLocalSearchParams();
    return (<Item userId={userId} reward={JSON.parse(reward.toString())}/>);
}