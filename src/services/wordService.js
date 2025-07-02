import { Word } from "../models/word";
import { loadWords, saveWords } from "./storageService";

export const wordService = {
  async getAllWords() {
    return await loadWords();
  },

  async addWord(wordData) {
    // Create a new Word instance
    const newWord = new Word(
      wordData.word,
      wordData.pronunciation || "",
      wordData.type || "noun",
      wordData.definition || "",
      wordData.example || ""
    );

    // Get existing words and add the new one
    const existingWords = await loadWords();
    const updatedWords = [...existingWords, newWord];

    // Save back to storage
    await saveWords(updatedWords);
    return newWord;
  },

  async deleteWord(wordId) {
    const existingWords = await loadWords();
    const filteredWords = existingWords.filter((word) => word.id !== wordId);
    await saveWords(filteredWords);
    return true;
  },

  async updateWord(wordId, updatedData) {
    const existingWords = await loadWords();
    const updatedWords = existingWords.map((word) => {
      if (word.id === wordId) {
        return { ...word, ...updatedData };
      }
      return word;
    });

    await saveWords(updatedWords);
    return updatedWords.find((word) => word.id === wordId);
  },

  async deleteAllWords() {
    await saveWords([]);
    return true;
  },
};
