import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
    // const {userType, setUserType} = useContext(AppContext)!;
    // setUserType("business");
    const {isLoaded, isSignedIn} = useAuth();
    console.log("sign in: " +isSignedIn);
    if (!isLoaded) return <View><Text>Loading...</Text></View>
    if (isSignedIn) {
        console.log("signed in");
        return <Redirect href="/landing" />;
    }
    console.log("not signed in");
    return <Redirect href="/welcome" />;
}
