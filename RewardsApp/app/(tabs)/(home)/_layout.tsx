import { Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}}/>
      <Stack.Screen name="offers" options={{ headerShown: false}}/>
      <Stack.Screen name="item"/>
    </Stack>
  );
}