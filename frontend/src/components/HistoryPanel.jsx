import React, { useState, useEffect } from 'react';
import { getHistory, clearHistory, deleteHistoryItem } from '../utils/localStorage';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';


function HistoryPanel({ onSelectHistoryItem, isOpen, onClose, theme = 'light' }) {
  const [history, setHistory] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); 
  const [filterLanguage, setFilterLanguage] = useState('all'); 
  
  const [expandedItems, setExpandedItems] = useState(new Set());

  // Reload history whenever the panel is opened
  useEffect(() => {
    if (isOpen) {
      const loadedHistory = getHistory();
      console.log('History loaded:', loadedHistory.length, 'items');
      setHistory(loadedHistory);
    }
  }, [isOpen]);

  const filteredAndSortedHistory = history
    
    .filter(item => {
      if (!searchTerm) return true;
      return item.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    })
    
    .filter(item => {
      if (filterLanguage === 'all') return true;
      return item.language === filterLanguage;
    })
    
    .sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      
      if (sortOrder === 'newest') {
        return dateB - dateA; 
      } else {
        return dateA - dateB; 
      }
    });

  const handleDelete = (index) => {
    
    const itemToDelete = filteredAndSortedHistory[index];
    const actualIndex = history.findIndex(
      item => item.timestamp === itemToDelete.timestamp
    );
    
    if (actualIndex !== -1) {
      deleteHistoryItem(actualIndex);
      setHistory(getHistory());
    }
  };

  // Handle clearing all history
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const toggleExpand = (timestamp) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(timestamp)) {
      newExpanded.delete(timestamp);
    } else {
      newExpanded.add(timestamp);
    }
    setExpandedItems(newExpanded);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLanguageName = (lang) => {
    const langMap = {
      'python': 'Python',
      'javascript': 'JavaScript',
      'cpp': 'C++'
    };
    return langMap[lang] || lang;
  };

  const getSyntaxLanguage = (lang) => {
    const langMap = {
      'python': 'python',
      'javascript': 'javascript',
      'cpp': 'cpp',
    };
    return langMap[lang] || 'text';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Prompt History</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 space-y-4 bg-gray-50 dark:bg-gray-900">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Prompts:
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search prompts..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* Filter and Sort Controls */}
          <div className="grid grid-cols-2 gap-4">
            {/* Language Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Language:
              </label>
              <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Languages</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="cpp">C++</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort by Date:
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Results Count and Clear Button */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredAndSortedHistory.length} of {history.length} items
            </p>
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg 
                         hover:bg-red-700 dark:hover:bg-red-600 text-sm"
            >
              Clear All History
            </button>
          </div>
        </div>

        {/* History List - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredAndSortedHistory.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p className="text-lg">No history found</p>
              <p className="text-sm mt-2">
                {history.length === 0 
                  ? 'Your prompt history will appear here' 
                  : 'Try adjusting your search or filters'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedHistory.map((item, index) => {
                const isExpanded = expandedItems.has(item.timestamp);
                
                return (
                  <div
                    key={item.timestamp}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 
                               hover:shadow-md dark:hover:shadow-lg transition-shadow
                               bg-white dark:bg-gray-800"
                  >
                    {/* Item Header */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 
                                         text-blue-800 dark:text-blue-200 
                                         text-xs font-semibold rounded">
                            {getLanguageName(item.language)}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(item.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 font-medium">
                          {item.prompt}
                        </p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => onSelectHistoryItem(item)}
                          className="px-3 py-1 bg-blue-600 dark:bg-blue-500 text-white text-sm 
                                   rounded hover:bg-blue-700 dark:hover:bg-blue-600"
                        >
                          Use
                        </button>
                        <button
                          onClick={() => toggleExpand(item.timestamp)}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 
                                   text-gray-700 dark:text-gray-200 text-sm 
                                   rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          {isExpanded ? 'Hide' : 'Show'} Code
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="px-3 py-1 bg-red-600 dark:bg-red-500 text-white text-sm 
                                   rounded hover:bg-red-700 dark:hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Expanded Code Display */}
                    {isExpanded && (
                      <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language={getSyntaxLanguage(item.language)}
                            style={theme === 'dark' ? vscDarkPlus : oneLight}
                            customStyle={{
                              margin: 0,
                              padding: '1rem',
                              fontSize: '12px',
                            }}
                          >
                            {item.code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPanel;

