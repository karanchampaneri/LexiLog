import { XStack, Button, YStack, Text, AnimatePresence } from "tamagui";
import { Book, User, Plus } from "@tamagui/lucide-icons";

export default function FloatingToolBar({
  onPreferencesPress,
  onAddWordPress,
  isVisible = true,
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <XStack
          key="floating-toolbar"
          position="absolute"
          bottom={40}
          left={20}
          right={20}
          justifyContent="space-around"
          alignItems="center"
          zIndex={100}
          animation="quickly"
          enterStyle={{
            y: 100,
            opacity: 0,
          }}
          exitStyle={{
            y: 100,
            opacity: 0,
          }}
        >
          {/* Left Button */}
          <Button
            backgroundColor="$card"
            borderRadius={999}
            padding="$3"
            elevation="$10"
          >
            <Book size={20} />
          </Button>

          {/* Center Button */}
          <Button
            onPress={onAddWordPress}
            icon={Plus}
            size="$5"
            borderRadius="$10"
            backgroundColor="$card"
            paddingHorizontal="$3"
            elevation="$20"
          >
            Add Word
          </Button>

          {/* Right Button */}
          <Button
            onPress={onPreferencesPress}
            backgroundColor="$card"
            borderRadius={999}
            padding="$3"
            elevation="$10"
          >
            <User size={20} />
          </Button>
        </XStack>
      )}
    </AnimatePresence>
  );
}
