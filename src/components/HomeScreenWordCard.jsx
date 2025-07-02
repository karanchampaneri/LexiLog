import { YStack, Text } from "tamagui";

export default function HomeScreenWordCard({ word }) {
  if (!word) return null;

  return (
    <YStack
      backgroundColor="$background"
      padding="$8"
      paddingTop="$10"
      paddingBottom="$8"
      alignItems="center"
      justifyContent="center"
      flex={1}
      gap="$6"
    >
      {/* Main Word */}
      <Text fontSize={48} fontWeight="600" textAlign="center" color="$color">
        {word.word}
      </Text>

      {/* Pronunciation */}
      {word.pronunciation && (
        <Text fontSize="$5" color="$gray10" textAlign="center">
          {word.pronunciation}
        </Text>
      )}

      {/* Definition */}
      <Text fontSize="$5" textAlign="center" color="$color" lineHeight="$6">
        {word.type && `(${word.type}) `}
        {word.definition || "Definition will be added automatically..."}
      </Text>

      {/* Example */}
      {word.example && (
        <Text
          fontSize="$4"
          textAlign="center"
          color="$gray10"
          maxWidth={320}
          lineHeight="$5"
          marginTop="$4"
        >
          {word.example}
        </Text>
      )}
    </YStack>
  );
}
