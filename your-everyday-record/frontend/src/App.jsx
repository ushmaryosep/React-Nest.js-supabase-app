import React, { useState } from 'react';
import { motion } from 'framer-motion';

const emotions = [
  { label: 'Happy', icon: '😊' },
  { label: 'Sad', icon: '😔' },
  { label: 'Satisfied', icon: '😌' },
  { label: 'Excited', icon: '🤩' },
  { label: 'Anxious', icon: '😰' }
];

export default function App() {
  const [form, setForm] = useState({ emotion: '', note: '', energy: 5 });

  const handleSave = async () => {
    await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emotion_summary: form.emotion,
        description: form.note,
        energy_level: form.energy
      })
    });
    alert("Record Saved! ✨");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      {/* Landing Header */}
      <header className="text-center mb-12 relative">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-200 rounded-full blur-3xl -z-10"
        />
        <h1 className="text-2xl font-bold tracking-tighter">YOUR EVERYDAY RECORD</h1>
        <p className="text-sm text-gray-500">Write down what today meant to you.</p>
      </header>

      {/* Journal Card */}
      <div className="glass-card p-8 shadow-2xl">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Feeling</label>
        <div className="flex flex-wrap gap-2 my-4">
          {emotions.map(e => (
            <button 
              key={e.label}
              onClick={() => setForm({...form, emotion: e.label})}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 hover:shadow-md
                ${form.emotion === e.label ? 'bg-black text-white' : 'bg-white text-gray-600'}`}
            >
              {e.icon} {e.label}
            </button>
          ))}
        </div>

        <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Experience</label>
        <textarea 
          onChange={(e) => setForm({...form, note: e.target.value})}
          className="w-full mt-2 p-4 bg-white/50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none h-32"
          placeholder="What happened today?"
        />

        <button 
          onClick={handleSave}
          className="w-full mt-8 bg-gradient-to-r from-blue-400 to-indigo-400 text-white font-bold py-4 rounded-2xl shadow-lg hover:opacity-90 transition-opacity"
        >
          Save Today's Record
        </button>
      </div>
    </div>
  );
}