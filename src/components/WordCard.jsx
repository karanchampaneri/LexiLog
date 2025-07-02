import { YStack, Text } from "tamagui";

export default function WordCard({ word }) {
  return (
    <YStack
      padding="$5"
      borderRadius="$6"
      backgroundColor="$background"
      gap="$3"
    >
      <Text fontSize={32} fontWeight="700" textAlign="center" color="$color">
        {word.word}
      </Text>

      {/* Only show pronunciation if it exists */}
      {word.pronunciation && (
        <Text
          fontSize={18}
          fontWeight="500"
          textAlign="center"
          color="$color"
          opacity={0.7}
        >
          {word.pronunciation}
        </Text>
      )}

      {/* Only show definition if it exists */}
      {word.definition && (
        <Text
          fontSize={18}
          fontWeight="500"
          textAlign="center"
          color="$color"
          fontStyle="italic"
        >
          {word.type && `(${word.type}) `}
          {word.definition}
        </Text>
      )}

      {/* Only show example if it exists */}
      {word.example && (
        <Text
          fontSize={16}
          textAlign="center"
          color="$color"
          opacity={0.85}
          marginTop="$2"
        >
          {word.example}
        </Text>
      )}

      {/* Show placeholder text if no definition yet */}
      {!word.definition && !word.pronunciation && (
        <Text
          fontSize={16}
          textAlign="center"
          color="$color"
          opacity={0.5}
          fontStyle="italic"
        >
          Definition will be added automatically...
        </Text>
      )}
    </YStack>
  );
}
