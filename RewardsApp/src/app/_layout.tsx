import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AppProvider } from '@/store/AppContext';
import { CartProvider } from '@/store/CartContext';
import FONTS from '@/constants/fonts';
export default function RootLayout() {
  const [loaded, error] = useFonts({
    'GowunDodum-Regular': require('@/assets/fonts/GowunDodum-Regular.ttf'),
    'BalooBhai2-VariableFont_wght': require('@/assets/fonts/BalooBhai2-VariableFont_wght.ttf'),
    'BalooBhaiBold': require('@/assets/fonts/BalooBhaiBold.ttf')
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <AppProvider>
        <CartProvider>
          <Stack screenOptions={
      {title: "", headerTitleStyle:{fontSize: 24, fontFamily: FONTS.BALOO_BHAI, fontWeight: 800, color: 'rgba(58, 73, 117, 1)'},
      headerBackButtonDisplayMode:'minimal', headerShadowVisible:false, headerTintColor:'rgba(58, 73, 117, 1)' }}>
            <Stack.Screen name="index" options={{ headerShown: false}}/>
            <Stack.Screen name="(user)" options={{ headerShown: false}}/>
            <Stack.Screen name="(auth)" options={{ headerShown: false}}/>
          </Stack>
        </CartProvider>        
      </AppProvider>
    </ClerkProvider>
  );

}
