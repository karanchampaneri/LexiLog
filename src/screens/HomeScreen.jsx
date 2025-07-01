import { YStack, Text, Button } from "tamagui";

export default function HomeScreen() {
  return (
    <YStack f={1} jc="center" ai="center" bg="$background">
      <Text fontSize="$8" fontWeight="bold">
        Welcome to LexiLog 📘
      </Text>
    </YStack>
  );
}
