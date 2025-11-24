/**
 * LocalStorage Utility Functions
 * This file handles saving and retrieving history from browser's localStorage
 */

// Key name for storing history in localStorage
const HISTORY_KEY = 'codeCopilotHistory';

/**
 * Get all history items from localStorage
 * @returns {Array} 
 */
export const getHistory = () => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);

    if (!historyJson) {
      return [];
    }
    
    return JSON.parse(historyJson);
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
};

/**
 * Save a new history item to localStorage
 * @param {Object} item - History item with prompt, code, language, timestamp
 */
export const saveHistoryItem = (item) => {
  try {
    const history = getHistory();

    const newHistory = [item, ...history];
  
    const limitedHistory = newHistory.slice(0, 50);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
    
    // Debug: Verify save worked
    console.log('History saved successfully. Total items:', limitedHistory.length);
  } catch (error) {
    console.error('Error saving history:', error);
  }
};

/**
 * Clear all history from localStorage
 */
export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

/**
 * Delete a specific history item by index
 * @param {number} index - Index of item to delete
 */
export const deleteHistoryItem = (index) => {
  try {
    const history = getHistory();
    // Remove item at index
    const newHistory = history.filter((_, i) => i !== index);
    // Save updated history
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Error deleting history item:', error);
  }
};

