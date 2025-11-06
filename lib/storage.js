"use client";

/**
 * Loads data from localStorage.
 * This function is client-side only.
 * @returns {object | null} The parsed data object or null if not found or on error.
 */
export const loadData = () => {
  // Ensure this code runs only in the browser
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const serializedData = localStorage.getItem('rag-chatbot-data');
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    // If there's an error (e.g., corrupted data), it's safer to return null
    return null;
  }
};

/**
 * Saves data to localStorage.
 * This function is client-side only.
 * @param {object} data The data object to save.
 */
export const saveData = (data) => {
  // Ensure this code runs only in the browser
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem('rag-chatbot-data', serializedData);
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};