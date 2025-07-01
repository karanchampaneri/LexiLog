import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "lexilog_words";

// Save the entire word list to AsyncStorage

export const saveWords = async (wordsArray) => {
  try {
    const jsonValue = JSON.stringify(wordsArray);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving words:", e);
  }
};

// Load the word list from AsyncStorage

export const loadWords = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error loading words:", e);
    return [];
  }
};

// Clear all stored words for testing purposes

export const clearWords = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Error clearing words:", e);
  }
};
