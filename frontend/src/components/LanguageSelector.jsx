import React from 'react';

export default function LanguageSelector({ language, onLanguageChange, disabled }) {
  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'cpp', label: 'C++' },
  ];

  return (
    <div className="w-full">
      <label 
        htmlFor="language" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Select Language:
      </label>
      <select
        id="language"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}

