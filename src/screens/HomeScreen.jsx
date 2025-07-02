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
import FloatingToolBar from "../components/FloatingToolBar";
import PreferencesScreen from "./PreferencesScreen";

export default function HomeScreen() {
  const { words, loading, addWord } = useWords(); // Use WordContext
  const [showPreferences, setShowPreferences] = useState(false);
  const [showAddWordSheet, setShowAddWordSheet] = useState(false);

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
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 60, // Safe area for status bar
          paddingBottom: 120, // Extra space for floating toolbar
        }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap="$4">
          {/* Pill-shaped Word Counter */}
          <XStack
            backgroundColor="white"
            borderRadius="$8"
            paddingHorizontal="$4"
            paddingVertical="$1"
            alignItems="center"
            gap="$2"
            alignSelf="center"
            marginTop="$5"
          >
            {/* icon */}
            <Bookmark size={12} color="$gray8" />
            {/* Word Count */}
            <Text fontSize="$2" fontWeight="500" color="$gray8">
              {words.length}
            </Text>
          </XStack>

          <YStack gap="$2">
            {loading ? (
              <YStack gap="$4" paddingVertical="$8" alignItems="center">
                <Text fontSize="$4" color="$gray10" textAlign="center">
                  Loading words...
                </Text>
              </YStack>
            ) : words.length === 0 ? (
              <YStack gap="$4" paddingVertical="$8" alignItems="center">
                <Text fontSize="$6" color="$gray10" textAlign="center">
                  No words yet!
                </Text>
                <Text fontSize="$4" color="$gray8" textAlign="center">
                  Tap the + button below to add your first word
                </Text>
              </YStack>
            ) : (
              words.map((word) => <WordCard key={word.id} word={word} />)
            )}
          </YStack>
        </YStack>
      </ScrollView>

      <FloatingToolBar
        onPreferencesPress={() => setShowPreferences(true)}
        onAddWordPress={() => setShowAddWordSheet(true)}
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
