import { Word } from "../models/word";
import * as storage from "./storageService";

export const wordService = {
  async getAllWords() {
    return await storage.loadWords();
  },

  async addWord(wordData) {
    const newWord = new Word(
      wordData.word,
      wordData.pronunciation || "",
      wordData.audioUrl || "",
      wordData.type || "noun",
      wordData.definition || "",
      wordData.example || ""
    );
    return await storage.addWord(newWord);
  },

  async deleteWord(wordId) {
    return await storage.deleteWord(wordId);
  },

  async updateWord(wordId, updatedData) {
    try {
      await storage.updateWord(wordId, updatedData);
      return await storage.getWord(wordId);
    } catch (error) {
      console.error("Error updating word:", error);
      throw error;
    }
  },

  async deleteAllWords() {
    return await storage.deleteAllWords();
  },
};
