// React Imports
import { useState } from "react";

// Tamagui Imports
import { YStack, Text, ScrollView, Button, XStack } from "tamagui";
import { Bookmark } from "@tamagui/lucide-icons";

// Context Imports
import { useWords } from "../context/WordContext";

// Local Imports
import AddWordSheet from "../components/AddWordSheet";
import WordCard from "../components/WordCard";
import HomeScreenWordCard from "../components/HomeScreenWordCard";
import FloatingToolBar from "../components/FloatingToolBar";
import PreferencesScreen from "./PreferencesScreen";

export default function HomeScreen() {
  const { words, loading, addWord } = useWords(); // Use WordContext
  const [showPreferences, setShowPreferences] = useState(false);
  const [showAddWordSheet, setShowAddWordSheet] = useState(false);

  // Get the latest word (most recently added)
  const latestWord = words.length > 0 ? words[0] : null;

  const handleWordsListPress = () => {
    // Placeholder for future navigation to words list
    console.log("Navigate to words list");
  };

  const handleAddWord = async (wordData) => {
    try {
      await addWord(wordData); // Use context method to add word
    } catch (error) {
      console.error("Error adding word:", error);
      throw error; // Re-throw to let AddWordSheet handle the error
    }
  };

  return (
    <YStack flex={1} bg="$background">
      {/* Pill-shaped Word Counter - Fixed at top */}
      <YStack
        position="absolute"
        top={0}
        left={0}
        right={0}
        alignItems="center"
        marginTop="$12"
        zIndex={10}
      >
        <XStack
          backgroundColor="white"
          borderRadius="$8"
          paddingHorizontal="$4"
          paddingVertical="$1"
          alignItems="center"
          gap="$2"
        >
          {/* icon */}
          <Bookmark size={12} color="$gray8" />
          {/* Word Count */}
          <Text fontSize="$2" fontWeight="500" color="$gray8">
            {words.length}
          </Text>
        </XStack>
      </YStack>

      {/* Main Content - Centered */}
      <YStack flex={1} justifyContent="center" alignItems="center">
        {loading ? (
          <YStack gap="$4" alignItems="center">
            <Text fontSize="$4" color="$gray10" textAlign="center">
              Loading words...
            </Text>
          </YStack>
        ) : words.length === 0 ? (
          <YStack gap="$4" alignItems="center" paddingHorizontal="$6">
            <Text fontSize="$6" color="$gray10" textAlign="center">
              No words yet!
            </Text>
            <Text fontSize="$4" color="$gray8" textAlign="center">
              Tap the + button below to add your first word
            </Text>
          </YStack>
        ) : latestWord ? (
          <HomeScreenWordCard word={latestWord} />
        ) : (
          <YStack gap="$4" alignItems="center" paddingHorizontal="$6">
            <Text fontSize="$6" color="$gray10" textAlign="center">
              No words yet!
            </Text>
            <Text fontSize="$4" color="$gray8" textAlign="center">
              Tap the + button below to add your first word
            </Text>
          </YStack>
        )}
      </YStack>

      <FloatingToolBar
        onPreferencesPress={() => setShowPreferences(true)}
        onAddWordPress={() => setShowAddWordSheet(true)}
        onWordsListPress={handleWordsListPress}
        isVisible={!showAddWordSheet && !showPreferences}
      />

      <AddWordSheet
        open={showAddWordSheet}
        onOpenChange={setShowAddWordSheet}
        onAddWord={handleAddWord}
      />

      <PreferencesScreen
        open={showPreferences}
        onOpenChange={setShowPreferences}
      />
    </YStack>
  );
}
