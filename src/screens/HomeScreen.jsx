// React Imports
import { useState, useEffect } from "react";

// Tamagui Imports
import { YStack, Text, ScrollView } from "tamagui";
import { loadWords, saveWords } from "../services/storageService";

// Local Imports
import AddWordForm from "../components/AddWordForm";
import WordCard from "../components/WordCard"; // Import the WordCard component to display each word
import FloatingToolBar from "../components/FloatingToolBar";
import PreferencesScreen from "./PreferencesScreen";

export default function HomeScreen() {
  const [words, setWords] = useState([]); // stores the list of words when a new word is added.
  const [showPreferences, setShowPreferences] = useState(false); // state to manage navigation to preferences screen

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

  // If preferences screen should be shown, render it instead of home
  if (showPreferences) {
    return <PreferencesScreen onBack={() => setShowPreferences(false)} />;
  }

  return (
    <YStack f={1} bg="$background">
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 100, // Extra space for floating toolbar
        }}
      >
        <YStack gap="$4">
          <Text fontSize="$8" fontWeight="bold" textAlign="center" pt="$6">
            📘 LexiLog
          </Text>

          <AddWordForm onAddWord={handleAddWord} />

          <YStack gap="$2" pt="$4">
            {words.map((word, index) => (
              <WordCard key={index} word={word} />
            ))}
          </YStack>
        </YStack>
      </ScrollView>

      <FloatingToolBar onPreferencesPress={() => setShowPreferences(true)} />
    </YStack>
  );
}
