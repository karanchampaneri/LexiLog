import React, { createContext, useContext, useState, useEffect } from "react";
import { wordService } from "../services/wordService";
import { Word } from "../models/word";
import { getFormattedWordData } from "../utils/dictionaryApi";

const WordContext = createContext();

export const useWords = () => {
  const context = useContext(WordContext);
  if (!context) {
    throw new Error("useWords must be used within a WordProvider");
  }
  return context;
};

export const WordProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load words on mount
  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    try {
      setLoading(true);
      const savedWords = await wordService.getAllWords();
      const sortedWords = savedWords.sort(
        (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
      );
      setWords(sortedWords);
    } catch (error) {
      console.error("Error loading words:", error);
    } finally {
      setLoading(false);
    }
  };

  const addWord = async (word) => {
    const tempId = `temp_${Date.now()}`;
    const tempWord = new Word(word, "", "", "Loading definition...", "");
    tempWord.id = tempId;

    // Optimistically add the word to the UI
    setWords((prevWords) => [tempWord, ...prevWords]);

    try {
      // Fetch full data in the background
      const wordData = await getFormattedWordData(word);
      const fullWordData = {
        word: wordData.word,
        pronunciation: wordData.phonetic || wordData.phoneticSpelling || "",
        audioUrl: wordData.audioUrl || "", // Optional audio URL
        type: wordData.definitions?.[0]?.partOfSpeech || "",
        definition: wordData.definitions?.[0]?.definition || "",
        example: wordData.definitions?.[0]?.example || "",
      };

      // Add to Firestore and get the final word object with ID
      const finalWord = await wordService.addWord(fullWordData);

      // Update the UI with the final word data
      setWords((prevWords) =>
        prevWords.map((w) => (w.id === tempId ? finalWord : w))
      );
      return finalWord;
    } catch (error) {
      console.error("Error adding word:", error);
      // If something fails, remove the temporary word
      setWords((prevWords) => prevWords.filter((w) => w.id !== tempId));
      throw error;
    }
  };

  const deleteWord = async (wordId) => {
    try {
      await wordService.deleteWord(wordId);
      setWords((prevWords) => prevWords.filter((word) => word.id !== wordId));
    } catch (error) {
      console.error("Error deleting word:", error);
      throw error;
    }
  };

  const updateWord = async (wordId, updatedData) => {
    try {
      const updatedWord = await wordService.updateWord(wordId, updatedData);
      setWords((prevWords) =>
        prevWords.map((word) => (word.id === wordId ? updatedWord : word))
      );
      return updatedWord;
    } catch (error) {
      console.error("Error updating word:", error);
      throw error;
    }
  };

  const deleteAllWords = async () => {
    try {
      await wordService.deleteAllWords();
      setWords([]);
    } catch (error) {
      console.error("Error deleting all words:", error);
      throw error;
    }
  };

  const value = {
    words,
    loading,
    addWord,
    deleteWord,
    updateWord,
    deleteAllWords,
    loadWords,
  };

  return <WordContext.Provider value={value}>{children}</WordContext.Provider>;
};
