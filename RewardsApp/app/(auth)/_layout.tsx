import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{headerShadowVisible: false, headerTransparent: true, headerBackButtonDisplayMode: 'minimal'}}>
            <Stack.Screen name="welcome" options={{ headerShown: false}}/>
            <Stack.Screen name="sign-in" options={{ headerShown: true, headerTitle: "", headerTintColor: "white"}}/>
            <Stack.Screen name="sign-up" options={{ headerShown: true, headerTitle: "", headerTintColor: "#3A4975"}}/>
        </Stack>
    );
}