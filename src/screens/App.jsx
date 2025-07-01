import { TamaguiProvider, YStack } from "tamagui";
import tamaguiConfig from "../config/tamagui.config";
import HomeScreen from "./HomeScreen";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Inter: Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,
  });

  // Hide the splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Don't render until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <YStack f={1} bg="$background">
          <SafeAreaView style={{ flex: 1 }}>
            <HomeScreen />
          </SafeAreaView>
        </YStack>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
