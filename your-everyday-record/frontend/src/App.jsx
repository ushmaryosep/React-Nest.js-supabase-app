import React, { useState } from 'react';
import './App.css'; 

export default function App() {
  const [form, setForm] = useState({ emotion: '', description: '', energy: 5 });

  const handleSave = async () => {
    if (!form.description || !form.emotion) return alert("Please fill in today's record!");
    
    await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emotion_summary: form.emotion,
        description: form.description,
        energy_level: parseInt(form.energy)
      })
    });
    alert("Record Saved! ✨");
  };

  return (
    <div className="app-container">
      {/* 🌀 Landing Header */}
      <header className="floating-header">
        <div className="orb"></div>
        <h1>YOUR EVERYDAY RECORD</h1>
        <p>“Write down what today meant to you.”</p>
      </header>

      {/* ✍️ Form Card */}
      <div className="journal-card">
        <h3>How are you feeling?</h3>
        <div className="emotion-btns">
          {['😊 Happy', '😔 Sad', '😌 Satisfied', '🤩 Excited', '😰 Anxious'].map(emo => (
            <button 
              key={emo} 
              className={form.emotion === emo ? 'active' : ''}
              onClick={() => setForm({...form, emotion: emo})}
            >
              {emo}
            </button>
          ))}
        </div>

        <h3>Describe Your Experience</h3>
        <textarea 
          placeholder="What happened today?"
          onChange={(e) => setForm({...form, description: e.target.value})}
        />

        <h3>Energy Level: {form.energy}</h3>
        <input type="range" min="1" max="10" onChange={(e) => setForm({...form, energy: e.target.value})} />

        <button className="save-btn" onClick={handleSave}>Save Today's Record</button>
      </div>
    </div>
  );
}