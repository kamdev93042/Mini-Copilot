import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromptInput from './components/PromptInput';
import LanguageSelector from './components/LanguageSelector';
import GenerateButton from './components/GenerateButton';
import CodeOutput from './components/CodeOutput';
import HistoryPanel from './components/HistoryPanel';
import { saveHistoryItem } from './utils/localStorage';

export default function App() {

  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [showHistory, setShowHistory] = useState(false);
  const [theme, setTheme] = useState('light');

  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/generate';

  // Debug: Log API URL (remove in production if needed)
  useEffect(() => {
    console.log('API URL:', API_URL);
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setError('');
    setLoading(true);
    setCode('');

    try {
      const response = await axios.post(API_URL, {
        prompt: prompt,
        language: language,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setCode(response.data.code);
      
      const historyItem = {
        prompt: prompt,
        code: response.data.code,
        language: language,
        timestamp: new Date().toISOString(), 
      };
      
      // Save to localStorage
      saveHistoryItem(historyItem);
      
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || 'Failed to generate code');
      } else if (err.request) {
        setError(`Cannot connect to backend at ${API_URL}. Please check your backend URL.`);
      } else {
        setError(err.message || 'Failed to generate code');
      }
      setCode('');
    } finally {
      setLoading(false);
    }
  };

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert('Code copied to clipboard!');
    } catch (err) {
      alert('Failed to copy code');
    }
  };

  const handleSelectHistoryItem = (item) => {
    setPrompt(item.prompt);
    setLanguage(item.language);
    setCode(item.code);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Mini Code Copilot
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Generate code from natural language prompts
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 
                           text-gray-800 dark:text-white rounded-lg
                           hover:bg-gray-300 dark:hover:bg-gray-600
                           focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:ring-offset-2
                           transition-colors duration-200
                           flex items-center gap-2"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <>
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Dark</span>
                  </>
                ) : (
                  <>
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Light</span>
                  </>
                )}
              </button>

              {/* History Button */}
              <button
                onClick={() => setShowHistory(true)}
                className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg
                           hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                           transition-colors duration-200
                           flex items-center gap-2"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                View History
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Input */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Enter Prompt
              </h2>
              
              <div className="space-y-4">
                <LanguageSelector
                  language={language}
                  onLanguageChange={setLanguage}
                  disabled={loading}
                />
                
                <PromptInput
                  prompt={prompt}
                  onPromptChange={setPrompt}
                  disabled={loading}
                />
                
                <GenerateButton
                  onClick={handleGenerate}
                  loading={loading}
                  disabled={!prompt.trim()}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800
                              rounded-lg text-red-700 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Output */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-full border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Generated Code
              </h2>
              
              <div className="h-[500px]">
                <CodeOutput
                  code={code}
                  language={language}
                  theme={theme}
                  onCopy={handleCopy}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* History Panel Modal */}
      <HistoryPanel
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onSelectHistoryItem={handleSelectHistoryItem}
        theme={theme}
      />
    </div>
  );
}
