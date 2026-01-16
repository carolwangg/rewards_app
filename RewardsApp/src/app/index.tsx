import Error from '@/components/Error';
import LogoPage from '@/components/LogoPage';
import { getUserType, pingBackend } from '@/services/apiCalls';
import { AppContext } from '@/store/AppContext';
import { useAuth } from '@clerk/clerk-expo';
import { useUser } from '@clerk/clerk-expo';
import { Redirect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from 'react';

export default function Index() {
    const {userType, setUserId, setUserType} = useContext(AppContext)!;
    const {isLoaded, isSignedIn} = useAuth();
    const {user} = useUser();
    const [server_ping, setServerPing] = useState(false);
    const [checked_server, setCheckedServer] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);
    // console.log("user at index:"+user);
    // console.log("user id at index:"+user?.id);
        
    const setUserTypeCallback = useCallback(async () => {
        try {
            if (user) {
                setUserId(user.id);
                let userType: string;
                try {
                    const fetchedUserType = await getUserType(user.id);
                    userType = fetchedUserType.user.toString();
                    setUserType(userType);
                    setUserLoaded(true);
                    console.log("Fetched user type:"+userType);
                } catch (error) {
                    console.error("Error fetching user type:", error);
                }
            }
        } catch (error) {
            console.error("Error fetching user type:", error);
        }
    }, [user]);

    useEffect(() => {
        console.log("Pinging backend to check server status...");
        pingBackend().then(() => {
            console.log("Server is up");
            setServerPing(true);
        }).catch((error) => {
            console.error("Server is down", error);
            setServerPing(false);
            setUserLoaded(true);
        });
        setCheckedServer(true);        
    }, []);

    useEffect(() => {
        setUserTypeCallback();
    }, [user]);

    if (!isLoaded || !checked_server || !userLoaded) return <LogoPage/>
    console.log("All loaded")
    if (!server_ping) return <Error error={"Cannot connect to server. Please try again later."} code={503}/>;
    console.log("Server can be pinged")
    console.log("userType:"+userType);
    if (isSignedIn) {
        if (userType==="") return <Error error={"Error loading user data."} code={404}/>;
        console.log("signed in userType:"+ userType);
        if (userType == "customer"){
            return <Redirect href="./customer/landing" />;
        }else if (userType == "business"){
            return <Redirect href="./business/landing" />;
        }
    }
    // user and server loaded properly, but user not signed in
    return <Redirect href="./welcome" />;
}
