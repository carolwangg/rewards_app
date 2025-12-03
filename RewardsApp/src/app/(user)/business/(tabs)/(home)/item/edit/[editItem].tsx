import UpdateReward from '@/screens/business/UpdateReward';
import { useLocalSearchParams, usePathname } from 'expo-router';
export default function Edit() {
    const { reward } = useLocalSearchParams();
    const rewardParsed = JSON.parse(reward?.toString());
    return (<UpdateReward prevReward={rewardParsed}/>);
}