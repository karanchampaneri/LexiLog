import { XStack, Button, YStack, Text, AnimatePresence } from "tamagui";
import { Book, User, Plus, X, List } from "@tamagui/lucide-icons";
import { useState } from "react";

export default function FloatingToolBar({
  onPreferencesPress,
  onAddWordPress,
  onWordsListPress, // New prop for opening words list
  isVisible = true,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLeftButtonPress = () => {
    setIsExpanded(!isExpanded);
  };

  const handleWordsListPress = () => {
    setIsExpanded(false); // Close the expanded state
    onWordsListPress?.(); // Call the words list handler
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop - Click anywhere to close expanded state */}
          {isExpanded && (
            <YStack
              key="backdrop"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              zIndex={99}
              onPress={() => setIsExpanded(false)}
              animation="quickly"
              enterStyle={{
                opacity: 0,
              }}
              exitStyle={{
                opacity: 0,
              }}
            />
          )}

          <YStack
            key="floating-toolbar"
            position="absolute"
            bottom={40}
            left={20}
            right={20}
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
            {/* Main Content - Stack everything vertically */}
            <YStack alignItems="center" width="100%">
              {/* Main Toolbar */}
              <XStack
                justifyContent="space-around"
                alignItems="flex-end"
                width="100%"
              >
                {/* Left Section - YStack containing both expanded and main left button */}
                <YStack alignItems="center" gap="$3">
                  {/* Additional Button - Shows when expanded */}
                  <AnimatePresence>
                    {isExpanded && (
                      <Button
                        key="words-list-button"
                        onPress={handleWordsListPress}
                        backgroundColor="$card"
                        borderRadius={999}
                        padding="$3"
                        elevation="$10"
                        pressStyle={{ scale: 0.95 }}
                        animation="fast"
                        enterStyle={{
                          y: 20,
                          opacity: 0,
                          scale: 0.8,
                        }}
                        exitStyle={{
                          y: 20,
                          opacity: 0,
                          scale: 0.8,
                        }}
                      >
                        <List size={20} />
                      </Button>
                    )}
                  </AnimatePresence>

                  {/* Left Button - Toggle between Book and X icon */}
                  <Button
                    onPress={handleLeftButtonPress}
                    backgroundColor={isExpanded ? "$red10" : "$card"}
                    borderRadius={999}
                    padding="$3"
                    elevation="$10"
                    pressStyle={{ scale: 0.95 }}
                    animation="quickly"
                  >
                    {isExpanded ? <X size={20} /> : <Book size={20} />}
                  </Button>
                </YStack>

                {/* Center Button */}
                <Button
                  onPress={onAddWordPress}
                  icon={Plus}
                  size="$5"
                  borderRadius="$10"
                  backgroundColor="$card"
                  paddingHorizontal="$3"
                  elevation="$20"
                  pressStyle={{ scale: 0.95 }}
                >
                  <Text>Add Word</Text>
                </Button>

                {/* Right Button */}
                <Button
                  onPress={onPreferencesPress}
                  backgroundColor="$card"
                  borderRadius={999}
                  padding="$3"
                  elevation="$10"
                  pressStyle={{ scale: 0.95 }}
                >
                  <User size={20} />
                </Button>
              </XStack>
            </YStack>
          </YStack>
        </>
      )}
    </AnimatePresence>
  );
}
