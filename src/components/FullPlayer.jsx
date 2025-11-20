import React from 'react';
import { ChevronDown, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const FullPlayer = ({ 
  laguAktif, 
  isPlaying, 
  onPlayPause, 
  onClose, 
  waktuSekarang, 
  totalDurasi,
  onNext,
  onPrev
}) => {

  const formatWaktu = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const persentase = totalDurasi ? (waktuSekarang / totalDurasi) * 100 : 0;

  return (
    // CONTAINER UTAMA
    // fixed inset-0: Menutupi seluruh layar
    // z-[60]: Paling atas
    <div className="fixed inset-0 z-[60] flex flex-col bg-white text-gray-900">
      
      {/* --- 1. BACKGROUND (FIXED) --- */}
      {/* Kita pisahkan background biar dia DIAM saat konten di-scroll */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img 
          src={laguAktif.cover} 
          className="w-full h-full object-cover blur-3xl opacity-30 scale-110" 
          alt="Blur Background"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl"></div>
      </div>

      {/* --- 2. WRAPPER SCROLLABLE --- */}
      {/* overflow-y-auto: INI KUNCINYA! Biar bisa di-scroll naik turun di HP */}
      <div className="w-full h-full overflow-y-auto flex flex-col">
        
        {/* TOMBOL CLOSE & HANDLE BAR */}
        <div className="p-6 md:p-8 flex flex-col items-center sticky top-0 z-20">
          
          {/* Handle Bar (Garis kecil visual ala iOS/Android) */}
          <div className="w-12 h-1.5 bg-gray-300/50 rounded-full mb-4 md:hidden" onClick={onClose}></div>
          
          <div className="w-full flex justify-between items-center">
            <button 
              onClick={onClose} 
              className="bg-gray-200/50 hover:bg-gray-200 p-2 rounded-full transition backdrop-blur-sm"
            >
              <ChevronDown size={28} className="text-gray-700" />
            </button>
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase opacity-80">Sedang Diputar</span>
            <div className="w-10"></div>
          </div>
        </div>

        {/* KONTEN UTAMA */}
        {/* min-h-0 flex-1 menjamin konten mengisi ruang tapi tidak maksa overflow */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-start md:justify-center px-8 md:px-20 pb-12 gap-8 md:gap-20">
          
          {/* GAMBAR ALBUM */}
          <div className="w-full max-w-[280px] md:max-w-md flex-shrink-0 shadow-2xl rounded-2xl overflow-hidden aspect-square transform transition-transform hover:scale-[1.02]">
            <img 
              src={laguAktif.cover} 
              alt="Album Art" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* INFO & KONTROL */}
          <div className="w-full max-w-md flex flex-col items-center md:items-start text-center md:text-left pb-10">
            
            {/* Judul */}
            <div className="mb-6 md:mb-10 w-full">
              <h1 className="text-2xl md:text-5xl font-black text-gray-900 mb-2 leading-tight mt-4 md:mt-0">
                {laguAktif.judul}
              </h1>
              <h2 className="text-lg md:text-2xl font-medium text-red-500">
                {laguAktif.artis}
              </h2>
              <p className="text-gray-500 text-sm mt-1">{laguAktif.album}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full mb-8">
              <div className="h-2 bg-gray-400/30 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-red-500 rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${persentase}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-700 font-mono">
                <span>{formatWaktu(waktuSekarang)}</span>
                <span>{formatWaktu(totalDurasi)}</span>
              </div>
            </div>

            {/* Tombol Kontrol */}
            <div className="flex items-center justify-center md:justify-start gap-8 md:gap-10 mb-8">
              <button onClick={onPrev} className="text-gray-800/70 hover:text-gray-900 transition transform hover:scale-110">
                <SkipBack size={36} md:size={40} fill="currentColor"/>
              </button>
              
              <button 
                onClick={onPlayPause}
                className="bg-red-500 text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-xl hover:bg-red-600 hover:scale-105 transition-all active:scale-95"
              >
                {isPlaying ? <Pause size={32} md:size={36} fill="currentColor" /> : <Play size={32} md:size={36} fill="currentColor" className="ml-2" />}
              </button>

              <button onClick={onNext} className="text-gray-800/70 hover:text-gray-900 transition transform hover:scale-110">
                <SkipForward size={36} md:size={40} fill="currentColor"/>
              </button>
            </div>

          </div>
        </div>
      
      </div>
    </div>
  );
};

export default FullPlayer;