import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="[editItem]" options={{ headerShown: false}}/>
    </Stack>
  );
}