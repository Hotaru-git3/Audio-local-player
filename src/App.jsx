import React, { useState, useRef } from 'react';
import { Menu, Music } from 'lucide-react'; 

import Sidebar from './components/Sidebar';
import SongList from './components/SongList';
import PlayerControl from './components/PlayerControl';
import FullPlayer from './components/FullPlayer';
import { dataLagu } from './data/songs';

// Halaman About
const AboutPage = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center overflow-y-auto pb-24 pt-20 md:pt-8 animate-fade-in">
    <div className="w-32 h-32 bg-gray-200 rounded-full mb-6 overflow-hidden shadow-xl mx-auto transition-transform hover:scale-105 duration-500">
      <img src="https://placehold.co/400" alt="Profile" className="w-full h-full object-cover" />
    </div>
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Nama Kamu</h1>
    <p className="text-red-500 font-medium mb-4">Multimedia Developer</p>
    <p className="text-gray-500 max-w-md mx-auto text-sm">
      Aplikasi ini dibuat sebagai tugas Multimedia Authoring.
      Menggabungkan React, Tailwind CSS, dan Audio Engineering dasar.
    </p>
  </div>
);

const App = () => {
  // STATE
  const [laguAktif, setLaguAktif] = useState(dataLagu[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, setDuration] = useState(0); 
  const [menu, setMenu] = useState('beranda');
  
  // State UI
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioRef = useRef(null);

  // --- LOGIKA AUDIO ---

  const handlePlayPause = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleGantiLagu = (laguBaru) => {
    setLaguAktif(laguBaru);
    setIsPlaying(true);
    setShowFullPlayer(true); 
    setTimeout(() => audioRef.current.play(), 100);
  };

  const handleNext = () => {
    const index = dataLagu.findIndex(lagu => lagu.id === laguAktif.id);
    if (index < dataLagu.length - 1) setLaguAktif(dataLagu[index + 1]);
    else setLaguAktif(dataLagu[0]);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 100);
  };

  const handlePrev = () => {
    const index = dataLagu.findIndex(lagu => lagu.id === laguAktif.id);
    if (index > 0) setLaguAktif(dataLagu[index - 1]);
    else setLaguAktif(dataLagu[dataLagu.length - 1]);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 100);
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
    setDuration(e.target.duration);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden relative">
      <audio 
        ref={audioRef} 
        src={laguAktif.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleNext}
      />

      {showFullPlayer && (
        <FullPlayer 
          laguAktif={laguAktif}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onClose={() => setShowFullPlayer(false)} 
          waktuSekarang={currentTime}
          totalDurasi={duration}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}

      {/* --- MOBILE HEADER BAR (BARU) --- */}
      {/* Hanya muncul di Mobile (md:hidden) */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 z-30 flex items-center px-4 gap-4 md:hidden shadow-sm">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all active:scale-90"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2 text-red-500 font-bold text-lg">
          <Music size={20} />
          <span>MyMusic</span>
        </div>
      </div>

      <Sidebar 
        menuAktif={menu} 
        gantiMenu={setMenu} 
        isOpen={isMobileMenuOpen}           
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      {menu === 'about' ? (
        <AboutPage />
      ) : (
        <SongList 
          daftarLagu={dataLagu} 
          laguAktif={laguAktif} 
          fungsiGantiLagu={handleGantiLagu}
          menuAktif={menu}
        />
      )}
      
      <div onClick={() => setShowFullPlayer(true)} className="cursor-pointer fixed bottom-0 w-full z-50">
        <PlayerControl 
          laguAktif={laguAktif} 
          statusMain={isPlaying} 
          fungsiPlayPause={(e) => { e.stopPropagation(); handlePlayPause(); }}
          waktuSekarang={currentTime}
          totalDurasi={duration}
          onNext={(e) => { e.stopPropagation(); handleNext(); }}
          onPrev={(e) => { e.stopPropagation(); handlePrev(); }}
        />
      </div>
    </div>
  );
};

export default App;