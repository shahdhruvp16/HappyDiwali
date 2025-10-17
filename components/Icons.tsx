
import React from 'react';

export const DiyaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 60" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50 Q50 60 90 50 Q50 40 10 50" fill="#d2691e" />
    <path d="M20 50 Q50 30 80 50" fill="#8b4513" />
  </svg>
);

export const LitDiyaFlame: React.FC<{ className?: string }> = ({ className }) => (
    <g className={className}>
        <path d="M50 40 Q55 20 50 10 Q45 20 50 40" fill="url(#flameGradient)" />
        <defs>
            <radialGradient id="flameGradient">
                <stop offset="0%" stopColor="white" />
                <stop offset="30%" stopColor="#ffdd00" />
                <stop offset="100%" stopColor="#ff4500" />
            </radialGradient>
        </defs>
    </g>
);

// FIX: Add style prop to allow for dynamic positioning.
export const LanternIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg viewBox="0 0 60 100" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="40" height="10" fill="#a0522d"/>
    <rect x="5" y="20" width="50" height="60" fill="#f08080" rx="5"/>
    <rect x="20" y="25" width="20" height="50" fill="#ffebcd"/>
    <rect x="10" y="80" width="40" height="10" fill="#a0522d"/>
  </svg>
);

// FIX: Add style prop to allow for dynamic positioning.
export const RangoliIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#ff69b4" strokeWidth="5" />
    <circle cx="50" cy="50" r="30" fill="#add8e6" />
    <circle cx="50" cy="50" r="15" fill="#90ee90" />
    {[0, 72, 144, 216, 288].map(angle => (
      <circle key={angle} cx={50 + 38 * Math.cos(angle * Math.PI / 180)} cy={50 + 38 * Math.sin(angle * Math.PI / 180)} r="10" fill="#ffa500" />
    ))}
  </svg>
);

// FIX: Add style prop to allow for dynamic positioning.
export const LightsIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg viewBox="0 0 200 50" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 25 C 40 5, 60 45, 90 25 S 140 5, 190 25" stroke="gray" strokeWidth="2" fill="none" />
    <circle cx="30" cy="18" r="8" fill="#ff0" />
    <circle cx="75" cy="35" r="8" fill="#f0f" />
    <circle cx="115" cy="15" r="8" fill="#0ff" />
    <circle cx="165" cy="32" r="8" fill="#0f0" />
  </svg>
);

export const SoundOnIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
);

export const SoundOffIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>
);

export const Loader: React.FC = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative w-24 h-16">
            <DiyaIcon className="w-24 h-16" />
            <div className="absolute top-0 left-0 right-0 flex justify-center">
                 <LitDiyaFlame className="w-12 h-12 animate-pulse" />
            </div>
        </div>
        <p className="text-xl text-yellow-300 font-dancing animate-pulse">Preparing your Diwali magic...</p>
    </div>
);
