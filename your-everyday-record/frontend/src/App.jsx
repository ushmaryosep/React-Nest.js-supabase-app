import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const emotions = ['😊 Happy', '😔 Sad', '😌 Satisfied', '🤩 Excited', '😰 Anxious'];

export default function App() {
  const [entry, setEntry] = useState({ emotion: '', description: '', energy: 5 });

  const handleSave = async () => {
    if (!entry.description) return alert("Please share your thoughts.");
    
    // Calls our Nest.js backend
    const res = await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emotion_summary: entry.emotion,
        description: entry.description,
        energy_level: parseInt(entry.energy)
      }),
    });
    if (res.ok) alert("Entry saved safely. ✨");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] p-4">
      {/* 🌀 Looping Floating Animation */}
      <header className="text-center mb-12 relative">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-200 rounded-full blur-3xl -z-10"
        />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">YOUR EVERYDAY RECORD</h1>
        <p className="text-gray-500 italic mt-2">“Write down what today meant to you.”</p>
      </header>

      {/* ✍️ Centered Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100"
      >
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">How do you feel?</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {emotions.map(emo => (
            <button 
              key={emo}
              onClick={() => setEntry({...entry, emotion: emo})}
              className={`px-4 py-2 rounded-full text-sm transition-all ${entry.emotion === emo ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            >
              {emo}
            </button>
          ))}
        </div>

        <textarea 
          placeholder="What happened today?"
          className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 h-32 resize-none transition-all"
          onChange={(e) => setEntry({...entry, description: e.target.value})}
        />

        <div className="mt-8">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Energy: {entry.energy}</label>
          <input type="range" min="1" max="10" value={entry.energy} className="w-full mt-4 accent-indigo-600" onChange={(e) => setEntry({...entry, energy: e.target.value})} />
        </div>

        <button 
          onClick={handleSave}
          className="w-full mt-10 bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Save Today's Record
        </button>
      </motion.div>
    </div>
  );
}