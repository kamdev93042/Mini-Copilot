
import React from 'react';

export default function PromptInput({ prompt, onPromptChange, disabled }) {
  return (
    <div className="w-full">
      <label 
        htmlFor="prompt" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Enter your code prompt:
      </label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        disabled={disabled}
        placeholder="e.g., Write a Python function to reverse a string"
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed
                   placeholder-gray-400 dark:placeholder-gray-500
                   resize-none"
        rows={6}
      />
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Describe what code you want to generate
      </p>
    </div>
  );
}

