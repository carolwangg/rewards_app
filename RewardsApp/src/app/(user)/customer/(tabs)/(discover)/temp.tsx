import Map from '@/components/Map'
import { generateDefaultMapBusinesses } from '@/constants/interfaces';
export default function Discover(){
    const businesses = generateDefaultMapBusinesses(5);
    return <Map businesses={businesses}/>
}