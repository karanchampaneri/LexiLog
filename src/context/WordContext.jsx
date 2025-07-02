import React, { createContext, useContext, useState, useEffect } from "react";
import { wordService } from "../services/wordService";

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
      setWords(savedWords);
    } catch (error) {
      console.error("Error loading words:", error);
    } finally {
      setLoading(false);
    }
  };

  const addWord = async (wordData) => {
    try {
      const newWord = await wordService.addWord(wordData);
      setWords((prevWords) => [...prevWords, newWord]);
      return newWord;
    } catch (error) {
      console.error("Error adding word:", error);
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
