
import React, { useState, DragEvent } from 'react';
import { Decoration } from '../types';
import { DiyaIcon, LitDiyaFlame, LanternIcon, RangoliIcon, LightsIcon } from './Icons';

interface DecorationPageProps {
  decorations: Decoration[];
  setDecorations: React.Dispatch<React.SetStateAction<Decoration[]>>;
  onComplete: () => void;
}

const DecorationItem: React.FC<{ type: Decoration['type']; onDragStart: (e: DragEvent<HTMLDivElement>, type: Decoration['type']) => void; children: React.ReactNode }> = ({ type, onDragStart, children }) => (
    <div
        draggable
        onDragStart={(e) => onDragStart(e, type)}
        className="cursor-grab bg-white/20 p-2 rounded-lg backdrop-blur-sm shadow-lg hover:bg-white/30 transition-all active:cursor-grabbing flex flex-col items-center space-y-1 w-24 h-24 justify-center"
    >
        {children}
        <span className="text-white text-sm capitalize">{type}</span>
    </div>
);

const DecorationPage: React.FC<DecorationPageProps> = ({ decorations, setDecorations, onComplete }) => {
    const handleDragStart = (e: DragEvent<HTMLDivElement>, type: Decoration['type']) => {
        e.dataTransfer.setData('decorationType', type);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('decorationType') as Decoration['type'];
        const dropZone = e.currentTarget.getBoundingClientRect();
        const newDecoration: Decoration = {
            id: Date.now(),
            type,
            x: e.clientX - dropZone.left,
            y: e.clientY - dropZone.top,
        };
        setDecorations(prev => [...prev, newDecoration]);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    
    const renderDecoration = (dec: Decoration) => {
        const style = { position: 'absolute' as const, left: `${dec.x}px`, top: `${dec.y}px`, transform: 'translate(-50%, -50%)' };
        switch(dec.type) {
            case 'diya': return <div style={style} className="w-12 h-8 relative"><DiyaIcon className="w-full h-full"/><LitDiyaFlame className="w-6 h-6 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3" /></div>;
            case 'lantern': return <LanternIcon style={style} className="w-12 h-20" />;
            case 'rangoli': return <RangoliIcon style={style} className="w-20 h-20" />;
            case 'lights': return <LightsIcon style={style} className="w-32 h-12" />;
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-between text-white p-4 overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-dancing text-yellow-300 drop-shadow-lg animate-fade-in-down">Decorate Your Diwali House 🏠</h2>
            
            <div className="flex-grow w-full max-w-4xl mx-auto my-4 relative" onDrop={handleDrop} onDragOver={handleDragOver}>
                <div 
                    className="absolute inset-0 bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: `url('https://i.imgur.com/uDfm4q1.png')` }} // A simple house illustration
                ></div>
                {decorations.map(renderDecoration)}
            </div>

            <div className="flex flex-col items-center space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DecorationItem type="diya" onDragStart={handleDragStart}><div className="relative w-12 h-8"><DiyaIcon/><LitDiyaFlame className="w-6 h-6 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3"/></div></DecorationItem>
                    <DecorationItem type="lantern" onDragStart={handleDragStart}><LanternIcon className="w-10 h-16"/></DecorationItem>
                    <DecorationItem type="rangoli" onDragStart={handleDragStart}><RangoliIcon className="w-16 h-16"/></DecorationItem>
                    <DecorationItem type="lights" onDragStart={handleDragStart}><LightsIcon className="w-20 h-10"/></DecorationItem>
                </div>
                {decorations.length > 0 && (
                     <button onClick={onComplete} className="mt-4 px-8 py-3 bg-yellow-500 text-slate-900 font-bold rounded-full shadow-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 animate-fade-in-up">
                        Looks Beautiful! Let’s Celebrate 🎇
                    </button>
                )}
            </div>
        </div>
    );
};

export default DecorationPage;
