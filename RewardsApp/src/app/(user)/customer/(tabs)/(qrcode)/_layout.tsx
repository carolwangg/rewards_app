import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="qr-code" options={{ headerShown: false}}/>
      <Stack.Screen name="success" options={{ headerShown: false}}/>
    </Stack>
  );
}