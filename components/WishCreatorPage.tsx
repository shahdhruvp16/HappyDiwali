import React, { useState } from 'react';
import { WishData } from '../types';
import { generateWish } from '../services/geminiService';
import { Loader } from './Icons';

interface WishCreatorPageProps {
  onWishCreated: (data: WishData) => void;
}

const WishCreatorPage: React.FC<WishCreatorPageProps> = ({ onWishCreated }) => {
  const from = 'Shah Dhruv';
  const [to, setTo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to) {
      setError("Please enter the recipient's name.");
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const generatedWish = await generateWish(from, to);
      onWishCreated({ from, to, mood: 'Heartfelt', customMessage: '', generatedWish });
    } catch (err) {
      setError('Could not generate wish. Please try again.');
      setIsLoading(false);
    }
  };
  
  if(isLoading) {
    return <div className="w-full h-full flex items-center justify-center"><Loader /></div>
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-yellow-500/30 text-white">
        <h2 className="text-4xl font-dancing text-center text-yellow-300 mb-6">Create Your Personalized Wish</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-center text-lg">From: <span className="font-bold text-yellow-200">{from}</span></p>
          <input
            type="text"
            placeholder="Recipient's Name"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 px-8 py-3 bg-yellow-500 text-slate-900 font-bold rounded-full shadow-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 disabled:bg-gray-500"
          >
            Generate Wish ✨
          </button>
        </form>
      </div>
    </div>
  );
};

export default WishCreatorPage;