import React, { useState } from 'react';
import { Firework } from '../types';
import { FIREWORK_MESSAGES } from '../constants';

// ---------- Firework Particle Component ----------
const FireworkParticle: React.FC<{ x: number; y: number; message: string }> = ({ x, y, message }) => {
    const particleCount = 60;
    const particles = Array.from({ length: particleCount });
    const colors = ['#FFD700', '#FF6347', '#00FF7F', '#1E90FF', '#FF69B4', '#FFFFFF'];

    return (
        <div className="absolute pointer-events-none" style={{ top: y, left: x }}>
            {particles.map((_, i) => {
                const angle = Math.random() * 360;
                const radius = Math.random() * 120 + 80;
                const duration = Math.random() * 0.8 + 1.2;
                const delay = Math.random() * 0.1;
                const color = colors[Math.floor(Math.random() * colors.length)];

                return (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            backgroundColor: color,
                            boxShadow: `0 0 8px ${color}, 0 0 12px ${color}`,
                            animation: `explode-and-fall ${duration}s cubic-bezier(0.1, 0.8, 0.5, 1) ${delay}s forwards`,
                            '--angle': `${angle}deg`,
                            '--radius': `${radius}px`,
                            '--gravity-y': `${Math.random() * 50 + 80}px`,
                        } as React.CSSProperties}
                    ></div>
                );
            })}

            {/* Message in the center of explosion */}
            <div
                className="absolute -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl drop-shadow-lg"
                style={{ animation: 'fadeInOut 2s ease-in-out forwards' }}
            >
                {message}
            </div>

            {/* Firework Animations */}
            <style>{`
                @keyframes explode-and-fall {
                    0% {
                        transform: rotate(var(--angle)) translateX(0) translateY(0);
                        opacity: 1;
                    }
                    70% {
                        transform: rotate(var(--angle)) translateX(var(--radius)) translateY(var(--gravity-y));
                        opacity: 1;
                    }
                    100% {
                        transform: rotate(var(--angle)) translateX(var(--radius)) translateY(calc(var(--gravity-y) * 2));
                        opacity: 0;
                    }
                }
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: scale(0.5) translate(-50%, -50%); }
                    50% { opacity: 1; transform: scale(1.2) translate(-50%, -50%); }
                    100% { opacity: 0; transform: scale(0.8) translate(-50%, -50%); }
                }
            `}</style>
        </div>
    );
};

// ---------- Fireworks Page Component ----------
interface FireworksPageProps {
    onComplete: () => void;
}

const FireworksPage: React.FC<FireworksPageProps> = ({ onComplete }) => {
    const [fireworks, setFireworks] = useState<Firework[]>([]);
    const [clicks, setClicks] = useState(0);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const newFirework: Firework = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
            message: FIREWORK_MESSAGES[Math.floor(Math.random() * FIREWORK_MESSAGES.length)],
        };
        setFireworks((prev) => [...prev, newFirework]);
        setClicks((prev) => prev + 1);
    };

    return (
        <div className="w-full h-full cursor-pointer relative overflow-hidden bg-gradient-to-b from-slate-900 to-black" onClick={handleClick}>
            {/* Render fireworks */}
            {fireworks.map((fw) => (
                <FireworkParticle key={fw.id} x={fw.x} y={fw.y} message={fw.message} />
            ))}

            {/* Instruction message (visible until first click) */}
            {clicks < 1 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h3 className="text-2xl md:text-4xl font-dancing text-yellow-300 drop-shadow-lg animate-pulse text-center px-4">
                        Click anywhere on the screen to celebrate Diwali 🎆
                    </h3>
                </div>
            )}

            {/* Bottom section */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white">
                <h2 className="text-3xl font-dancing drop-shadow-lg mb-4">Light up the night!</h2>
                {clicks >= 3 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onComplete();
                        }}
                        className="px-8 py-3 bg-yellow-500 text-slate-900 font-bold rounded-full shadow-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                    >
                        Now let’s make your Diwali wish ✨
                    </button>
                )}
            </div>
        </div>
    );
};

export default FireworksPage;
