import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="qrcode" options={{ headerShown: false}}/>
      <Stack.Screen name="cart"/>
    </Stack>
  );
}