# Mini Code Copilot

A lightweight web application for code generation using natural language prompts. Built with React, Node.js, Express, and Tailwind CSS.

## Features

### Core Features
- **Natural Language Code Generation**: Enter prompts in plain English to generate code
- **Multi-Language Support**: Generate code in Python, JavaScript, and C++
- **Syntax Highlighting**: Beautiful code display with syntax highlighting
- **Real-time Code Generation**: Fast API responses with loading indicators

### Bonus Features
- **Prompt History**: View, search, and reuse previous prompts (persisted in localStorage)
- **Language Filter**: Filter history by programming language
- **Search Functionality**: Search through your prompt history
- **Sort Options**: Sort history by newest or oldest
- **Theme Toggle**: Switch between light and dark mode
- **Copy to Clipboard**: One-click code copying

##  Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS** - Styling
- **Axios** - API calls
- **react-syntax-highlighter** - Code syntax highlighting

### Backend
- **Node.js**
- **Express.js** - REST API
- **CORS** - Cross-origin requests

## Project Structure

```
Mini Copilot/
├── backend/
│   ├── routes/
│   │   └── api.js          # API endpoints
│   ├── server.js            # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx          # Main app component
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port shown in terminal)

## API Endpoints

### POST /api/generate

Generate code from a prompt.

**Request:**
```json
{
  "prompt": "Write a Python function to reverse a string",
  "language": "python"
}
```

**Response:**
```json
{
  "code": "def reverse_string(s):\n    return s[::-1]",
  "language": "python",
  "prompt": "Write a Python function to reverse a string",
  "message": "Code generated successfully"
}
```

## Features in Detail

### Prompt History
- Automatically saves all generated code to localStorage
- Search through previous prompts
- Filter by programming language
- Sort by date (newest/oldest)
- Reuse prompts with one click
- Delete individual items or clear all

### Theme Toggle
- Light and dark mode support
- Preference persists across sessions
- Smooth transitions
- Syntax highlighter themes adapt to theme

##  Architecture Decisions

- **Direct API Calls**: API calls made directly from components (no service layer) for simplicity
- **localStorage**: Used for history persistence (no backend database needed)
- **Tailwind CSS**: Utility-first CSS for rapid UI development
- **Mock Backend**: Simple Express server with hardcoded code snippets (simulates AI)

## Deployment

### Backend (Render)
- **URL**: https://mini-copilot.onrender.com
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Frontend (Vercel)
- **URL**: https://mini-copilot-ten.vercel.app
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**: `VITE_API_URL` = `https://mini-copilot.onrender.com/api/generate`

## Future Improvements

If I had more time, I would:
- Add more programming languages
- Implement real AI integration (OpenAI API, etc.)
- Add code export functionality
- Implement favorites/bookmarks for prompts
- Add adjustable font size and line spacing
- Add user authentication for cloud history sync
- Improve error handling and user feedback
- Add unit tests
- Optimize performance with code splitting

## License

This project is created as a take-home assignment.

## Author
 Kamdev Kumar

---

**Note**: This is a demo application with a mock backend. The code generation is simulated and does not use actual AI.

