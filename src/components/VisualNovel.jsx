import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, MonitorPlay, Minus, X } from 'lucide-react'; 
import { storyScript } from '../data/story'; 

const VisualNovel = ({ gantiLagu, daftarLagu, onMinimize, onClose }) => {
  const [gameStatus, setGameStatus] = useState('splash'); 
  const [currentSceneId, setCurrentSceneId] = useState(1);
  
  const scene = storyScript.find(s => s.id === currentSceneId);
  const voRef = useRef(null);

  // --- 1. LOGIC VOICE OVER (Folder: /voiceover/) ---
  useEffect(() => {
    // Stop VO sebelumnya biar gak tumpang tindih
    if (voRef.current) {
      voRef.current.pause();
      voRef.current.currentTime = 0;
    }

    // Play VO cuma pas statusnya 'playing' dan scene punya voiceId
    if (gameStatus === 'playing' && scene?.voiceId) {
      const audioPath = `/voiceover/${scene.voiceId}.mp3`;
      voRef.current = new Audio(audioPath);
      voRef.current.volume = 1.0; 
      voRef.current.play().catch(err => console.log("VO Error:", err));
    }

    // Cleanup pas scene pindah atau komponen tutup
    return () => {
      if (voRef.current) voRef.current.pause();
    };
  }, [currentSceneId, gameStatus, scene]);

  // --- 2. LOGIC BGM (Lagu Tema Langsung Jalan) ---
  useEffect(() => {
    // Logic ini jalan gak peduli 'splash' atau 'playing'
    // Jadi pas awal buka (currentSceneId = 1), lagu langsung kepanggil
    if (scene?.musicId) {
      const laguTarget = daftarLagu.find(l => l.id === scene.musicId);
      if (laguTarget) {
        gantiLagu(laguTarget);
      }
    }
  }, [currentSceneId, scene, daftarLagu, gantiLagu]); 

  // --- 3. LOGIC SFX KLIK ---
  const playSFX = (sfxId = 1) => {
    const sfx = new Audio(`/sfx/${sfxId}.mp3`); 
    sfx.play().catch(err => console.log("SFX Error:", err));
  };

  const handleChoice = (nextId) => {
    playSFX(); // Bunyi tiap klik pilihan
    setCurrentSceneId(nextId);
  };

  const restartGame = () => { 
    playSFX();
    setCurrentSceneId(1); 
    setGameStatus('splash'); 
    
    // Pastiin lagu balik ke tema awal pas retry
    const startScene = storyScript.find(s => s.id === 1);
    if (startScene?.musicId) {
      const laguTarget = daftarLagu.find(l => l.id === startScene.musicId);
      if (laguTarget) gantiLagu(laguTarget);
    }
  };

  // Handler buat Close agar VO bener-bener mati
  const handleCloseGame = () => {
    if (voRef.current) {
      voRef.current.pause();
    }
    onClose();
  };

  if (!scene && gameStatus === 'playing') return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white font-sans overflow-hidden animate-fade-in select-none">
      
      {/* WINDOW BAR */}
      <div className="absolute top-0 left-0 w-full h-10 bg-black/60 backdrop-blur border-b border-white/10 flex items-center justify-between px-4 z-[100]">
        <div className="flex items-center gap-2 text-white/70 text-xs font-mono uppercase tracking-widest">
          <MonitorPlay size={14} /> School_Romance.exe
        </div>
        <div className="flex gap-2">
          <button onClick={onMinimize} className="hover:text-yellow-400 p-1 transition"><Minus size={16}/></button>
          <button onClick={handleCloseGame} className="hover:text-red-500 p-1 transition"><X size={16}/></button>
        </div>
      </div>

      {/* SPLASH SCREEN (Tampilan Awal) */}
      {gameStatus === 'splash' && (
        <div className="w-full h-full relative flex flex-col items-center justify-center">
          <div className="absolute inset-0 z-0">
             <img src={storyScript[0].bg} className="w-full h-full object-cover blur-sm opacity-50" alt="bg"/>
          </div>
          <div className="z-10 text-center space-y-6 animate-bounce-in px-4">
            <h1 className="text-6xl md:text-8xl font-black drop-shadow-2xl tracking-tighter">
              Kisah <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Ando</span>
            </h1>
            <button 
              onClick={() => { playSFX(); setGameStatus('playing'); }}
              className="px-10 py-4 bg-white text-black hover:bg-red-600 hover:text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-red-500/50 hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <Play size={24} fill="currentColor" /> MULAI CERITA
            </button>
          </div>
        </div>
      )}

      {/* GAMEPLAY SCREEN (Tampilan Main) */}
      {gameStatus === 'playing' && (
        <div className="w-full h-full relative">
          
          {/* BACKGROUND LAYER */}
          <div className="absolute inset-0 z-0">
            <img key={scene.bg} src={scene.bg} className="w-full h-full object-cover animate-fade-in duration-1000" alt="bg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          </div>

          <div className="absolute inset-0 z-20 flex flex-col justify-end items-center pb-8 md:pb-12 px-4 md:px-12 pointer-events-none">
            <div className="w-full max-w-7xl flex flex-col md:flex-row items-end gap-6 md:gap-10">

              {/* KARAKTER (KIRI) */}
              {scene.char ? (
                <div className="mt-8 hidden md:block w-1/3 h-[85vh] max-w-[400px] animate-slide-up relative z-0">
                   <img src={scene.char} className="w-full mt-8 h-auto object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] mb-[-3rem]" alt="Character" />
                </div>
              ) : <div className="hidden md:block w-1/3"></div>} 


              {/* UI AREA (KANAN) */}
              <div className="flex-1 w-full pointer-events-auto flex flex-col gap-4">
                  
                  {/* PILIHAN */}
                  <div className="flex mb-10 flex-col items-center md:items-start gap-3 w-full animate-fade-in">
                    {scene.choices.length > 0 ? (
                      scene.choices.map((choice, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleChoice(choice.nextId)}
                          className="w-full md:w-auto min-w-[300px] text-left px-6 py-4 bg-black/60 hover:bg-red-600/90 border-l-4 border-red-500 hover:border-white backdrop-blur-md rounded-r-lg transition-all duration-200 transform hover:translate-x-2 shadow-lg group"
                        >
                          <span className="font-bold text-gray-300 group-hover:text-white">{idx + 1}.</span> {choice.text}
                        </button>
                      ))
                    ) : (
                       <button onClick={restartGame} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition hover:scale-105">
                        <RotateCcw size={20} /> Main Ulang
                      </button>
                    )}
                  </div>

                  {/* DIALOG BOX */}
                  <div className="relative w-full bg-gray-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl min-h-[160px]">
                    {scene.name && (
                      <div className="absolute -top-5 left-6 bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-[0_5px_15px_rgba(220,38,38,0.4)] border border-red-400">
                        {scene.name}
                      </div>
                    )}
                    <p className="text-lg md:text-2xl text-gray-200 leading-relaxed font-medium tracking-wide">
                      "{scene.text}"
                    </p>
                    <div className="absolute bottom-4 right-4 animate-bounce text-red-500">▼</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualNovel;