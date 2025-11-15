import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}}/>
      <Stack.Screen name="offers" options={{ headerShown: false}}/>
      <Stack.Screen name="item"/>
    </Stack>
  );
}