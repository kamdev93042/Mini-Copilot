import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeOutput({ code, language, theme = 'light', onCopy }) {
  
  const getLanguage = (lang) => {
    const langMap = {
      'python': 'python',
      'javascript': 'javascript',
      'cpp': 'cpp',
    };
    return langMap[lang] || 'text';
  };

  if (!code) {
    return (
      <div className="w-full h-full flex items-center justify-center
                      bg-gray-50 dark:bg-gray-900 border-2 border-dashed 
                      border-gray-300 dark:border-gray-600
                      rounded-lg">
        <p className="text-gray-400 dark:text-gray-500 text-center">
          Generated code will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Generated Code:
        </label>
        <button
          onClick={onCopy}
          className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 
                     hover:bg-gray-300 dark:hover:bg-gray-600
                     text-gray-800 dark:text-white
                     rounded-lg transition-colors duration-200
                     flex items-center gap-2"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </button>
      </div>
      <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language={getLanguage(language)}
          style={theme === 'dark' ? vscDarkPlus : oneLight}
          customStyle={{
            margin: 0,
            padding: '1rem',
            borderRadius: '0.5rem',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

