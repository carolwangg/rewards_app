import { Stack } from "expo-router";
import { useContext } from "react";
import { AppContext } from "@/store/AppContext";
export default function TabLayout() {
  const {userType} = useContext(AppContext)!;
  if (userType=="customer"){
    <Stack>
      <Stack.Screen name="customer" options={{ headerTitle: "trial", headerShown: false}}/>
    </Stack>
  }return (
    <Stack>
      <Stack.Screen name="business" options={{ headerShown: false}}/>
    </Stack>
  );
}