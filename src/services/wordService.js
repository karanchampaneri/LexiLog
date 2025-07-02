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
    return await storage.updateWord(wordId, updatedData);
  },

  async deleteAllWords() {
    return await storage.deleteAllWords();
  },
};
