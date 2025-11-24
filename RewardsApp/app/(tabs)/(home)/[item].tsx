import Item from '@/components/customer/Item';
import { useLocalSearchParams } from 'expo-router';
export default function Login() {
    const { item, name } = useLocalSearchParams();
    console.log(item, name)
    let eventName = name as string;
    return (<Item id={(Number)(item)} name={eventName}/>);
}