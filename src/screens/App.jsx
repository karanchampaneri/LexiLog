import { TamaguiProvider, YStack } from "tamagui";
import tamaguiConfig from "../config/tamagui.config";
import HomeScreen from "./HomeScreen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WordProvider } from "../context/WordContext";
import LoginScreen from "./LoginScreen";
import { auth } from "../config/firebase";

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
  // Authentication state management
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Inter: Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,
  });

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Hide the splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Don't render until fonts are loaded
  if (!fontsLoaded || loading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig}>
        <WordProvider>
          <YStack flex={1} bg="$background">
            {isAuthenticated ? <HomeScreen /> : <LoginScreen />}
          </YStack>
        </WordProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
