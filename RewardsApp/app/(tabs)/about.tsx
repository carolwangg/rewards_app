import ProfileBusiness from '@/components/Profile_Business';
import ProfileCustomer from '@/components/Profile_Customer';

const type_: "business" |  "customer" = "business";
export default function Login() {
    if (type_ == "customer") {
        return (<ProfileCustomer/>);
    } else {
        return (<ProfileBusiness/>);
    }
}