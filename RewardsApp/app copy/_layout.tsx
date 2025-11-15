import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'GowunDodum-Regular': require('../assets/fonts/GowunDodum-Regular.ttf'),
    'BalooBhai2-VariableFont_wght': require('../assets/fonts/BalooBhai2-VariableFont_wght.ttf')
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
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
    </Stack>
  );
}
