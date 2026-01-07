import LogoPage from '@/components/LogoPage';
import { getUserType } from '@/services/apiCalls';
import { AppContext } from '@/store/AppContext';
import { useAuth } from '@clerk/clerk-expo';
import { useUser } from '@clerk/clerk-expo';
import { Redirect } from "expo-router";
import { useCallback, useContext, useEffect } from 'react';

export default function Index() {
    const {userType, setUserId, setUserType} = useContext(AppContext)!;
    const {isLoaded, isSignedIn} = useAuth();
    const {user} = useUser();

    console.log("user at index:"+user);
    console.log("user id at index:"+user?.id);

    const getUserTypeCallback = useCallback(async () => {
        if (user) {
            setUserId(user.id);
            setUserType(await getUserType(user.id));
        }
    }, [user]);

    useEffect(() => {
        getUserTypeCallback();
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
