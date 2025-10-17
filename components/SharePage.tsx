
import React, { useRef, useState } from 'react';
import { WishData } from '../types';

interface SharePageProps {
  wishData: WishData;
  onRestart: () => void;
}

const SharePage: React.FC<SharePageProps> = ({ wishData, onRestart }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const generateLink = () => {
    const params = new URLSearchParams();
    params.append('from', wishData.from);
    params.append('to', wishData.to);
    params.append('wish', wishData.generatedWish);
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = `🪔 A special Diwali wish for you, ${wishData.to}!\n\n${wishData.generatedWish}\n\n- ${wishData.from}\n\nSee your beautiful greeting here: ${window.location.href}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const downloadCard = () => {
    if (cardRef.current && (window as any).html2canvas) {
      (window as any).html2canvas(cardRef.current, { useCORS: true, backgroundColor: null }).then((canvas: HTMLCanvasElement) => {
        const link = document.createElement('a');
        link.download = `Diwali_Wish_for_${wishData.to}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 overflow-y-auto">
        <div 
          ref={cardRef} 
          className="w-full max-w-lg aspect-[9/16] bg-gradient-to-br from-amber-800 via-orange-900 to-black p-8 rounded-2xl shadow-2xl flex flex-col justify-between text-center text-white relative overflow-hidden"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/shattered.png")' }}
        >
            <div>
                <h2 className="text-5xl font-dancing text-yellow-300 drop-shadow-lg">Happy Diwali</h2>
                <h3 className="text-3xl font-dancing text-yellow-200 drop-shadow-lg mt-2">{wishData.to}!</h3>
            </div>
            
            <p className="text-lg md:text-xl leading-relaxed my-8 font-light text-yellow-100">
                "{wishData.generatedWish}"
            </p>

            <div>
                <p className="text-xl font-dancing text-yellow-200">With love from,</p>
                <p className="text-2xl font-dancing text-yellow-300">{wishData.from}</p>
            </div>
        </div>
        
        <div className="mt-6 w-full max-w-lg grid grid-cols-2 gap-3">
            <button onClick={generateLink} className="p-3 bg-yellow-500 text-slate-900 rounded-lg font-semibold hover:bg-yellow-400 transition-all">
                {isCopied ? 'Link Copied!' : '🔗 Copy Share Link'}
            </button>
            <button onClick={shareOnWhatsApp} className="p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-all">
                📱 Share on WhatsApp
            </button>
            <button onClick={downloadCard} className="p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-all">
                💾 Download Card
            </button>
            <button onClick={onRestart} className="p-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all">
                🏠 Create Another
            </button>
        </div>
    </div>
  );
};

export default SharePage;
