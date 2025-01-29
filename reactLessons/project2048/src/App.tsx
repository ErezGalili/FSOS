import React from 'react';
import Game2048 from './components/Game2048';
import { RotateCcw } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">2048</h1>
        <p className="text-gray-600">Join the numbers and get to the 2048 tile!</p>
      </div>
      <Game2048 />
    </div>
  );
}

export default App;