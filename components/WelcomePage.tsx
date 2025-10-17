
import React, { useState } from 'react';
import { DiyaIcon, LitDiyaFlame } from './Icons';

interface WelcomePageProps {
  onDiyaLit: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onDiyaLit }) => {
  const [isLit, setIsLit] = useState(false);

  const handleDiyaClick = () => {
    if (isLit) return;
    setIsLit(true);
    // Play sound logic would be in App.tsx
    setTimeout(onDiyaLit, 1500); // Wait for animation
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center text-white p-4">
      <h1 className="text-5xl md:text-7xl font-dancing text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-8">
        LightUpDiwali
      </h1>
      <div
        className="relative cursor-pointer group"
        onClick={handleDiyaClick}
        style={{ width: '200px', height: '120px' }}
      >
        <DiyaIcon className="w-full h-full text-yellow-600 drop-shadow-lg" />
        {isLit && (
          <div className="absolute top-0 left-0 right-0 flex justify-center">
             <LitDiyaFlame className={`w-24 h-24 transform -translate-y-8 transition-opacity duration-1000 ${isLit ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        )}
      </div>
      <p className={`mt-8 text-xl md:text-2xl transition-opacity duration-500 ${isLit ? 'opacity-0' : 'opacity-100 animate-pulse'}`}>
        Click the diya to begin your Diwali journey 🪔
      </p>
    </div>
  );
};

export default WelcomePage;
