import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="about" options={{ headerShown: false}}/>
      <Stack.Screen name="options" options={{ headerShown: false}}/>
      <Stack.Screen name="language" options={{ headerShown: true, headerTitle: "", headerTintColor: "black"}}/>
    </Stack>
  );
}