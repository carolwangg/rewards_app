import { Redirect } from "expo-router";
import { useAuth } from '@clerk/clerk-expo'
import { View, Text } from "react-native";
export default function Index() {
    const {isLoaded, isSignedIn} = useAuth();
    console.log("sign in: " +isSignedIn);
    if (!isLoaded) return <View><Text>Loading...</Text></View>
    if (isSignedIn) {
        console.log("signed in");
        return <Redirect href="/(tabs)/(home)/landing" />;
    }
    console.log("not signed in");
    return <Redirect href="../(auth)/sign-in" />;
}
