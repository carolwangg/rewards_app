import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="edit" options={{ headerShown: false}}/>
      <Stack.Screen name="[item]" options={{ headerShown: false}}/>
    </Stack>
  );
}