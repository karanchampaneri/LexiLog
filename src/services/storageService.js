import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

const getWordsCollection = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated. Cannot access words collection.");
  }
  return collection(db, "users", user.uid, "words");
};

// Load all words for the current user
export const loadWords = async () => {
  try {
    const wordsCollection = getWordsCollection();
    const querySnapshot = await getDocs(wordsCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error loading words:", e);
    return [];
  }
};

// Add a new word
export const addWord = async (wordData) => {
  try {
    const wordsCollection = getWordsCollection();
    const docRef = await addDoc(wordsCollection, {
      ...wordData,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...wordData };
  } catch (e) {
    console.error("Error adding word:", e);
    return null;
  }
};

// Get a single word by ID
export const getWord = async (wordId) => {
  try {
    const wordsCollection = getWordsCollection();
    const wordRef = doc(wordsCollection, wordId);
    const docSnap = await getDoc(wordRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such word!");
      return null;
    }
  } catch (e) {
    console.error("Error getting word:", e);
    return null;
  }
};

// Update an existing word
export const updateWord = async (wordId, wordData) => {
  try {
    const wordsCollection = getWordsCollection();
    const wordRef = doc(wordsCollection, wordId);
    await updateDoc(wordRef, wordData);
  } catch (e) {
    console.error("Error updating word:", e);
  }
};

// Delete a word
export const deleteWord = async (wordId) => {
  try {
    const wordsCollection = getWordsCollection();
    const wordRef = doc(wordsCollection, wordId);
    await deleteDoc(wordRef);
  } catch (e) {
    console.error("Error deleting word:", e);
  }
};

// Delete all words for the current user
export const deleteAllWords = async () => {
  try {
    const wordsCollection = getWordsCollection();
    const querySnapshot = await getDocs(wordsCollection);
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  } catch (e) {
    console.error("Error deleting all words:", e);
  }
};
