import EditItem from '@/components/business/EditItem';
import { useLocalSearchParams, usePathname } from 'expo-router';
export default function Login() {
    console.log("Login");
    console.log("route:", usePathname());
    const { editItem, name, description, points } = useLocalSearchParams();
    return (<EditItem id={(Number)(editItem)} prevName={name as string} prevDescription={description as string} prevPoints={(Number)(points)}/>);
}