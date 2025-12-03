import LogoPage from '@/components/LogoPage';
import { AppContext } from '@/store/AppContext';
import { useAuth } from '@clerk/clerk-expo';
import { useUser } from '@clerk/clerk-expo';
import { Redirect } from "expo-router";
import { useContext, useEffect } from 'react';

export default function Index() {
    const {userType, setUserId, setUserType} = useContext(AppContext)!;
    // const {userType, setUserType} = useContext(AppContext)!;
    // setUserType("business");
    const {isLoaded, isSignedIn} = useAuth();
    const {user} = useUser();

    console.log("user at index:"+user);
    console.log("user id at index:"+user?.id);
    useEffect(() => {
        if (user) {
            setUserId(user.id);
            setUserType((String)(user.publicMetadata.userType));
        }
    }, [user]);
    // console.log("sign in: " +isSignedIn);
    if (!isLoaded) return <LogoPage/>
    if (isSignedIn) {
        if (userType=="") return <LogoPage/>
        // console.log("signed in");
        if (userType == "customer"){
            return <Redirect href="./customer/landing" />;
        }else if (userType == "business"){
            return <Redirect href="./business/landing" />;
        }
    }
    // console.log("not signed in");
    return <Redirect href="./welcome" />;
}
