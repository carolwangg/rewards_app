import UpdateCard from '@/screens/business/UpdateCard';
import { useLocalSearchParams } from 'expo-router';
export default function EditCard() {
    const { userId, card } = useLocalSearchParams();
    const cardParsed = JSON.parse(card?.toString());
    const userIdParsed = userId?.toString();

    return (<UpdateCard userId={userIdParsed} cardInterface={cardParsed}/>);
}