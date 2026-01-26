import { Stack } from "expo-router";
import FONTS from "@/constants/fonts";
export default function TabLayout() {
  return (
      <Stack screenOptions={
      {title: "", headerTitleStyle:{fontSize: 24, fontFamily: FONTS.BALOO_BHAI, fontWeight: 800, color: 'rgba(58, 73, 117, 1)'},
      headerBackButtonDisplayMode:'minimal', headerShadowVisible:false, headerTintColor:'rgba(58, 73, 117, 1)' }}>
      <Stack.Screen name="index" options={{ headerShown: false}}/>
    </Stack>
  );
}