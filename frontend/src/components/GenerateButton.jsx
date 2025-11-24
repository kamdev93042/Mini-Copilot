import React from 'react';

export default function GenerateButton({ onClick, loading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold
                 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none
                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed
                 transition-colors duration-200
                 flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Generating...
        </>
      ) : (
        'Generate Code'
      )}
    </button>
  );
}

