import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="add-item"/>
      <Stack.Screen name="edit"/>
      <Stack.Screen name="[item]"/>
      <Stack.Screen name="landing" options={{ headerShown: false}}/>

    </Stack>
  );
}