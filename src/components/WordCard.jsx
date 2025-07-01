import { YStack, Text } from "tamagui";

export default function WordCard({ word }) {
  return (
    <YStack
      borderWidth={1}
      borderColor="$gray8"
      borderRadius="$4"
      p="$3"
      bg="$background"
      shadowColor="$gray10"
      shadowOpacity={0.1}
      shadowRadius={10}
    >
      <Text fontSize="$6" fontWeight="400">
        {word}
      </Text>
    </YStack>
  );
}
