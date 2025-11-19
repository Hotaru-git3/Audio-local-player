import React, { useState, useRef } from 'react';
import { Menu } from 'lucide-react'; // <-- Jangan lupa import icon Menu

import Sidebar from './components/Sidebar';
import SongList from './components/SongList';
import PlayerControl from './components/PlayerControl';
import FullPlayer from './components/FullPlayer';
import { dataLagu } from './data/songs';

// ... (Kode AboutPage tetap sama)
const AboutPage = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center overflow-y-auto pb-24 pt-20 md:pt-8">
    <div className="w-32 h-32 bg-gray-200 rounded-full mb-6 overflow-hidden shadow-xl mx-auto">
      <img src="https://media.tenor.com/taxnt3zsc_4AAAAi/seseren-the-herta.gif" alt="Profile" className="w-full h-full object-cover" />
    </div>
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Herta</h1>
    <p className="text-red-500 font-medium mb-4">Esteemed member #83 of the Genius Society</p>
    <p className="text-gray-500 max-w-md mx-auto text-sm">
      Audio player.
    </p>
  </div>
);

const App = () => {
  // ... (State lama tetap sama)
  const [laguAktif, setLaguAktif] = useState(dataLagu[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, setDuration] = useState(0); 
  const [menu, setMenu] = useState('beranda');
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  
  // STATE BARU: MENU MOBILE
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioRef = useRef(null);

  // ... (Semua fungsi handlePlayPause, handleNext, handlePrev tetap sama)
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

      {/* --- TOMBOL HAMBURGER (Hanya muncul di HP) --- */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="absolute top-4 left-4 z-30 p-2 bg-white/80 backdrop-blur rounded-full shadow-md text-gray-700 md:hidden hover:cursor-pointer hover:bg-gray-200 transition"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar dengan Props Mobile */}
      <Sidebar 
        menuAktif={menu} 
        gantiMenu={setMenu} 
        isOpen={isMobileMenuOpen}           // Kirim status buka/tutup
        onClose={() => setIsMobileMenuOpen(false)} // Kirim fungsi tutup
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