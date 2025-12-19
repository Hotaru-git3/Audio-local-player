import React, { useState, useRef, } from 'react'; 
import { Menu, Music } from 'lucide-react'; 

import Sidebar from './components/Sidebar';
import SongList from './components/SongList';
import PlayerControl from './components/PlayerControl';
import FullPlayer from './components/FullPlayer';
import VisualNovel from './components/VisualNovel';
import ProjectGallery from './components/ProjectPreview'; 
import { dataLagu } from './data/songs';

const AboutPage = () => (
  <div className="flex-1 h-full bg-white overflow-y-auto pb-40 animate-fade-in text-left">
    <div className="bg-gradient-to-r from-gray-900 to-red-900 text-white py-20 px-8 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h4 className="text-red-400 font-bold uppercase tracking-widest text-sm mb-4">UAS Teknik Multimedia</h4>
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Kelompok 3 Project's & <br /> Interactive Story</h1>
        <div className="flex flex-wrap gap-4">
          <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-xs font-bold border border-white/20">React JS</span>
          <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-xs font-bold border border-white/20">Tailwind CSS</span>
          <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-xs font-bold border border-white/20">Multimedia Interaktif</span>
        </div>
      </div>
    </div>
    <div className="max-w-4xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Tentang Project</h3>
        <p className="text-gray-600 leading-relaxed mb-6">Project ini dikembangkan untuk menggabungkan lima elemen multimedia utama: Teks, Gambar, Audio, Video, dan Animasi ke dalam platform web interaktif.</p>
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-2">Fitur Utama:</h4>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Seamless Audio Web Player</li>
            <li>• Visual Novel dengan Branching Story</li>
            <li>• Galeri Video Preview Project</li>
            <li>• Integrasi Voice Over & SFX</li>
          </ul>
        </div>
      </div>
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Tim Pengembang</h3>
          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">03</div>
            <div>
              <p className="font-bold text-gray-900">Kelompok 3</p>
              <p className="text-sm text-gray-500">Teknik Multimedia & Jaringan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [laguAktif, setLaguAktif] = useState(dataLagu[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, setDuration] = useState(0); 
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [gameMode, setGameMode] = useState('closed'); 
  const [menu, setMenu] = useState('beranda'); 
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) audioRef.current.pause(); else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleGantiLagu = (laguBaru) => {
    if (laguAktif.id !== laguBaru.id) {
        setLaguAktif(laguBaru);
        setIsPlaying(true);
        if (gameMode !== 'open') setShowFullPlayer(true); 
        setTimeout(() => audioRef.current.play(), 100);
    }
  };

  // --- LOGIC NEXT: Skip Hidden Songs ---
  const handleNext = () => {
    const currentIndex = dataLagu.findIndex((l) => l.id === laguAktif.id);
    let nextIndex = currentIndex + 1;

    // Loop: Lewati lagu yang hidden
    while (nextIndex < dataLagu.length && dataLagu[nextIndex].isHidden) {
      nextIndex++;
    }

    // Loop balik ke awal kalo abis
    if (nextIndex >= dataLagu.length) {
      nextIndex = 0;
    }

    handleGantiLagu(dataLagu[nextIndex]);
  };

  // --- LOGIC PREV: Skip Hidden Songs ---
  const handlePrev = () => {
    const currentIndex = dataLagu.findIndex((l) => l.id === laguAktif.id);
    let prevIndex = currentIndex - 1;

    // Loop: Lewati lagu yang hidden (mundur)
    while (prevIndex >= 0 && dataLagu[prevIndex].isHidden) {
      prevIndex--;
    }

    // Loop ke lagu TERAKHIR yang GAK HIDDEN kalo udah mentok di awal
    if (prevIndex < 0) {
      let lastIndex = dataLagu.length - 1;
      while (lastIndex >= 0 && dataLagu[lastIndex].isHidden) {
        lastIndex--;
      }
      prevIndex = lastIndex;
    }

    handleGantiLagu(dataLagu[prevIndex]);
  };

  const handleMenuChange = (menuBaru) => {
    if (menuBaru === 'game') setGameMode('open');
    else {
      setMenu(menuBaru);
      if (gameMode === 'open') setGameMode('minimized');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden relative">
      <audio 
        ref={audioRef} 
        src={laguAktif.url} 
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)} 
        onLoadedMetadata={(e) => setDuration(e.target.duration)} 
        onEnded={handleNext} // Auto next pas lagu abis
      />
    
    {/* --- TAMBAHAN: TOMBOL HAMBURGER (Cuma muncul di HP) --- */}
    {!isMobileMenuOpen && (
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 bg-white/80 backdrop-blur-md rounded-lg shadow-md md:hidden text-gray-700 hover:text-red-500 transition"
      >
        <Menu size={24} />
      </button>
    )}
    {/* -------------------------------------------------------- */}

    <audio/>
      
      {gameMode !== 'closed' && (
        <div className={gameMode === 'minimized' ? 'hidden' : 'block'}>
          <VisualNovel 
            gantiLagu={handleGantiLagu} 
            daftarLagu={dataLagu} 
            onMinimize={() => setGameMode('minimized')} 
            onClose={() => {
  setGameMode('closed');
  
  // 1. Matiin paksa audio
  setIsPlaying(false);
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  setLaguAktif(dataLagu[0]); 
}}
          />
        </div>
      )}

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

      

      <Sidebar 
        menuAktif={gameMode === 'open' || gameMode === 'minimized' ? 'game' : menu} 
        gantiMenu={handleMenuChange} 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <main className="flex-1 h-full">
        {menu === 'about' ? <AboutPage /> : menu === 'projects' ? <ProjectGallery /> : (
          <SongList 
            daftarLagu={dataLagu} 
            laguAktif={laguAktif} 
            fungsiGantiLagu={handleGantiLagu} 
            menuAktif={menu} 
          />
        )}
      </main>

      {gameMode !== 'open' && (
        <div onClick={() => setShowFullPlayer(true)} className="cursor-pointer fixed bottom-0 w-full z-50">
          <PlayerControl 
            laguAktif={laguAktif} 
            statusMain={isPlaying} 
            fungsiPlayPause={(e) => { e.stopPropagation(); handlePlayPause(); }} 
            waktuSekarang={currentTime} 
            totalDurasi={duration} 
            onNext={handleNext} 
            onPrev={handlePrev} 
          />
        </div>
      )}
    </div>
  );
};

export default App;