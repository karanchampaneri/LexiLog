import { TamaguiProvider, YStack, Text } from "tamagui";
import tamaguiConfig from "../config/tamagui.config";
import HomeScreen from "./HomeScreen";

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <HomeScreen />
    </TamaguiProvider>
  );
}
