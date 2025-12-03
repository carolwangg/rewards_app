import { Stack } from "expo-router";
import FONTS from "@/constants/fonts";
export default function TabLayout() {
  return (
    <Stack>
      <Stack screenOptions={
      {title: "", headerTitleStyle:{fontSize: 24, fontFamily: FONTS.BALOO_BHAI, fontWeight: 800, color: 'rgba(58, 73, 117, 1)'},
      headerBackButtonDisplayMode:'minimal', headerShadowVisible:false, headerTintColor:'rgba(58, 73, 117, 1)' }}></Stack>
      <Stack.Screen name="discover" options={{ headerShown: false}}/>
      <Stack.Screen name="temp"/>
      <Stack.Screen name="item"/>
      <Stack.Screen name="business"/>
    </Stack>
  );
}