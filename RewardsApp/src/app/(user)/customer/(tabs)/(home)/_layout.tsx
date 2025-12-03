import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="landing" options={{ headerShown: false}}/>
      <Stack.Screen name="item"/>
      <Stack.Screen name="business"/>
    </Stack>
  );
}