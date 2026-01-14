import FONTS from "@/constants/fonts";
import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="account" options={{ headerShown: false}}/>
      <Stack.Screen name="language" options={{ headerShown: true, title: ""}}/>
      <Stack.Screen name="options" options={{ headerShown: false}}/>
    </Stack>
  );
}