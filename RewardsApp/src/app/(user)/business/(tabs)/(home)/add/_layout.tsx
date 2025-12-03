import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="add-item" options={{ headerShown: false}}/>
    </Stack>
  );
}