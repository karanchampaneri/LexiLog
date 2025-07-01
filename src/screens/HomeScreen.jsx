// React Imports
import { useState, useEffect } from "react";

// Tamagui Imports
import { YStack, Text, ScrollView } from "tamagui";
import { loadWords, saveWords } from "../services/storageService";

// Local Imports
import AddWordSheet from "../components/AddWordSheet";
import WordCard from "../components/WordCard"; // Import the WordCard component to display each word
import FloatingToolBar from "../components/FloatingToolBar";
import PreferencesScreen from "./PreferencesScreen";

export default function HomeScreen() {
  const [words, setWords] = useState([]); // stores the list of words when a new word is added.
  const [showPreferences, setShowPreferences] = useState(false); // state to manage preferences sheet visibility
  const [showAddWordSheet, setShowAddWordSheet] = useState(false); // state to manage add word sheet visibility

  useEffect(() => {
    // useEffect runs once when the component loads, inside call loadWords to fetch the saved words from storage
    const fetchWords = async () => {
      const saved = await loadWords(); // loads the words from storage
      setWords(saved); // sets the words state with the loaded words
    };
    fetchWords();
  }, []);

  const handleAddWord = async (newWord) => {
    const updatedWords = [...words, newWord]; // creates a new array with the existing words and the new word
    setWords((prevWords) => [...prevWords, newWord]); // adds the new word to the list
    await saveWords(updatedWords); // saves the updated words list to storage
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
          <Text fontSize="$8" fontWeight="bold" textAlign="center" mb="$4">
            📘 LexiLog
          </Text>

          <YStack gap="$2">
            {words.length === 0 ? (
              <YStack space="$4" paddingVertical="$8" alignItems="center">
                <Text fontSize="$6" color="$gray10" textAlign="center">
                  No words yet!
                </Text>
                <Text fontSize="$4" color="$gray8" textAlign="center">
                  Tap the + button below to add your first word
                </Text>
              </YStack>
            ) : (
              words.map((word, index) => <WordCard key={index} word={word} />)
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
