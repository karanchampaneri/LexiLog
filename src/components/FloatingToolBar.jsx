import { XStack, Button, YStack, Text } from "tamagui";
import { Book, User, Plus } from "@tamagui/lucide-icons";

export default function FloatingToolBar({ onPreferencesPress }) {
  return (
    <XStack
      position="absolute"
      bottom={20}
      left={0}
      right={0}
      justifyContent="space-around"
      alignItems="center"
      paddingHorizontal="$4"
      zIndex={10}
    >
      {/* Left Button */}
      <Button
        backgroundColor="$card"
        borderRadius={999}
        padding="$3"
        elevation="$5"
      >
        {/* <YStack> */}
        <Book size={20} />
        {/* </YStack> */}
      </Button>

      {/* Center Button */}
      <Button
        icon={Plus}
        size="$5"
        borderRadius="$10"
        backgroundColor="$card"
        paddingHorizontal="$3"
        elevation="$10"
      >
        Add Word
      </Button>

      {/* Right Button */}
      <Button
        onPress={onPreferencesPress}
        backgroundColor="$card"
        borderRadius={999}
        padding="$3"
        elevation="$5"
      >
        <User size={20} />
      </Button>
    </XStack>
  );
}
