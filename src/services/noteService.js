// services/noteService.js
import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

/**
 * Add a new note
 * @param {string} userId - The ID of the current user
 * @param {object} noteData - { title, content, tags }
 */
export const addNote = async (userId, noteData) => {
  try {
    const notesRef = collection(db, 'notes');
    const docRef = await addDoc(notesRef, {
      userId,
      ...noteData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

/**
 * Get all notes for a specific user
 * @param {string} userId
 */
export const getNotes = async (userId) => {
  try {
    const notesRef = collection(db, 'notes');
    const q = query(notesRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

/**
 * Get a single note by ID
 * @param {string} noteId
 */
export const getNoteById = async (noteId) => {
  try {
    const docRef = doc(db, 'notes', noteId);
    const noteSnap = await getDoc(docRef);

    if (noteSnap.exists()) {
      return { id: noteSnap.id, ...noteSnap.data() };
    } else {
      throw new Error("Note not found");
    }
  } catch (error) {
    console.error("Error getting note:", error);
    throw error;
  }
};
