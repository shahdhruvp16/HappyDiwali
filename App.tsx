
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Scene, WishData, Decoration, Mood } from './types';
import WelcomePage from './components/WelcomePage';
import DecorationPage from './components/DecorationPage';
import FireworksPage from './components/FireworksPage';
import WishCreatorPage from './components/WishCreatorPage';
import SharePage from './components/SharePage';
import { SoundOnIcon, SoundOffIcon } from './components/Icons';

const App: React.FC = () => {
    const [scene, setScene] = useState<Scene>(Scene.Welcome);
    const [wishData, setWishData] = useState<WishData | null>(null);
    const [decorations, setDecorations] = useState<Decoration[]>([]);
    const [isMuted, setIsMuted] = useState(true);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const from = params.get('from');
        const to = params.get('to');
        const wish = params.get('wish');

        if (from && to && wish) {
            setWishData({
                from,
                to,
                generatedWish: wish,
                mood: 'Joyful', // default mood for shared links
            });
            setScene(Scene.Share);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
            setIsMuted(audioRef.current.muted);
            if (!audioRef.current.muted && audioRef.current.paused) {
              audioRef.current.play().catch(e => console.error("Audio play failed", e));
            }
        }
    };

    const handleSceneChange = useCallback(() => {
      if (audioRef.current && !isMuted) {
          audioRef.current.play().catch(e => console.error("Audio play failed on scene change", e));
      }
    }, [isMuted]);

    const handleDiyaLit = () => {
        setScene(Scene.Decorate);
        handleSceneChange();
    };

    const handleDecorationComplete = () => {
        setScene(Scene.Fireworks);
        handleSceneChange();
    };

    const handleFireworksComplete = () => {
        setScene(Scene.Wish);
        handleSceneChange();
    };

    const handleWishCreated = (data: WishData) => {
        setWishData(data);
        setScene(Scene.Share);
        handleSceneChange();
    };
    
    const handleRestart = () => {
        setWishData(null);
        setDecorations([]);
        setScene(Scene.Welcome);
    };

    const renderScene = () => {
        switch (scene) {
            case Scene.Welcome:
                return <WelcomePage onDiyaLit={handleDiyaLit} />;
            case Scene.Decorate:
                return <DecorationPage decorations={decorations} setDecorations={setDecorations} onComplete={handleDecorationComplete} />;
            case Scene.Fireworks:
                return <FireworksPage onComplete={handleFireworksComplete} />;
            case Scene.Wish:
                return <WishCreatorPage onWishCreated={handleWishCreated} />;
            case Scene.Share:
                return wishData ? <SharePage wishData={wishData} onRestart={handleRestart} /> : <WelcomePage onDiyaLit={handleDiyaLit} />;
            default:
                return <WelcomePage onDiyaLit={handleDiyaLit} />;
        }
    };
    
    const backgroundClass = () => {
        switch(scene) {
            case Scene.Share:
                return 'bg-gradient-to-b from-yellow-800 to-orange-500';
            default:
                return 'bg-gradient-to-b from-gray-900 to-indigo-900';
        }
    }

    return (
        <main className={`h-screen w-screen overflow-hidden text-white transition-colors duration-1000 ${backgroundClass()}`}>
            {renderScene()}
            <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop muted />
            <button
                onClick={toggleMute}
                className="absolute top-4 right-4 bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition-all backdrop-blur-sm"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
                {isMuted ? <SoundOffIcon className="w-6 h-6" /> : <SoundOnIcon className="w-6 h-6" />}
            </button>
        </main>
    );
};

export default App;
