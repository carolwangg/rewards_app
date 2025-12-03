import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="[businessId]" options={{ headerShown: false}}/>
    </Stack>
  );
}