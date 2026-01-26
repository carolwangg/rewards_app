import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack screenOptions={{headerShadowVisible: false, headerTransparent: true, headerBackButtonDisplayMode: 'minimal'}}>
      <Stack.Screen name="account" options={{ headerShown: false}}/>
      <Stack.Screen name="options" options={{ headerShown: false}}/>
            <Stack.Screen name="settings" options={{ headerShown: true, headerTitle: "", headerTintColor: "black"}}/>

      <Stack.Screen name="language" options={{ headerShown: true, headerTitle: "", headerTintColor: "black"}}/>
    </Stack>
  );
}