import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AppProvider } from './AppContext';
export default function RootLayout() {
  const [loaded, error] = useFonts({
    'GowunDodum-Regular': require('@/assets/fonts/GowunDodum-Regular.ttf'),
    'BalooBhai2-VariableFont_wght': require('@/assets/fonts/BalooBhai2-VariableFont_wght.ttf')
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
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false}}/>
          <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
          <Stack.Screen name="(auth)" options={{ headerShown: false}}/>
        </Stack>
      </AppProvider>
    </ClerkProvider>
  );

}
