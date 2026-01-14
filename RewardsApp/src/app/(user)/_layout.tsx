import { Stack } from "expo-router";
import { useContext } from "react";
import { AppContext } from "@/store/AppContext";
export default function TabLayout() {
  const {userType} = useContext(AppContext)!;
  if (userType=="customer"){
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="customer" options={{ headerShown: false}}/>
    </Stack>
  }
  return <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="business" options={{ headerShown: false}}/>
    </Stack>
}