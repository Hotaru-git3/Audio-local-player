import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const PlayerControl = ({ 
  laguAktif, 
  statusMain, 
  fungsiPlayPause, 
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
    <div className="fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
      
      {/* ================= MOBILE LAYOUT (3 BARIS) ================= */}
      {/* Hanya muncul di HP (md:hidden) */}
      <div className="flex flex-col px-4 pb-4 pt-3 md:hidden">
        
        {/* BARIS 1: INFO LAGU */}
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={laguAktif.cover} 
            alt="Cover" 
            className="w-14 h-14 rounded-lg shadow-sm object-cover border border-gray-100" 
          />
          <div className="overflow-hidden flex-1">
            <h4 className="text-base font-bold text-gray-900 truncate leading-tight">{laguAktif.judul}</h4>
            <p className="text-sm text-gray-500 truncate">{laguAktif.artis}</p>
          </div>
        </div>

        {/* BARIS 2: TOMBOL KONTROL (Previous - Play - Next) */}
        <div className="flex items-center justify-between px-4 mb-4">
          <button onClick={onPrev} className="text-gray-400 hover:text-gray-900 active:scale-90 transition p-2">
            <SkipBack size={32} fill="currentColor"/>
          </button>
          
          <button 
            onClick={fungsiPlayPause}
            className="bg-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 active:scale-90 transition transform"
          >
            {statusMain ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1"/>}
          </button>
          
          <button onClick={onNext} className="text-gray-400 hover:text-gray-900 active:scale-90 transition p-2">
            <SkipForward size={32} fill="currentColor"/>
          </button>
        </div>

        {/* BARIS 3: PROGRESS BAR */}
        <div className="w-full flex items-center gap-3 text-xs text-gray-400 font-mono">
          <span className="w-8 text-right">{formatWaktu(waktuSekarang)}</span>
          <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden relative">
              <div 
              className="h-full bg-red-500 rounded-full transition-all duration-300 ease-linear shadow-[0_0_8px_rgba(239,68,68,0.5)]"
              style={{ width: `${persentase}%` }}
            ></div>
          </div>
          <span className="w-8">{formatWaktu(totalDurasi)}</span>
        </div>

      </div>

      {/* ================= DESKTOP LAYOUT (HORIZONTAL) ================= */}
      {/* Hanya muncul di Desktop (hidden md:flex) */}
      <div className="hidden md:flex items-center justify-between px-8 py-4 max-w-screen-2xl mx-auto h-24">
        
        {/* Info Kiri */}
        <div className="flex items-center gap-4 w-1/4 group">
          <img src={laguAktif.cover} className="w-14 h-14 rounded-lg shadow-sm object-cover transition-transform group-hover:scale-105" />
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-gray-900 truncate">{laguAktif.judul}</h4>
            <p className="text-xs text-gray-500 truncate">{laguAktif.artis}</p>
          </div>
        </div>

        {/* Kontrol Tengah */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex items-center gap-8 mb-2">
            <button onClick={onPrev} className="text-gray-400 hover:text-gray-900 transition transform hover:scale-110"><SkipBack size={20} fill="currentColor"/></button>
            
            <button onClick={fungsiPlayPause} className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:scale-110 transition-all active:scale-95">
              {statusMain ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5"/>}
            </button>
            
            <button onClick={onNext} className="text-gray-400 hover:text-gray-900 transition transform hover:scale-110"><SkipForward size={20} fill="currentColor"/></button>
          </div>
          
          <div className="w-full flex items-center gap-3 text-xs text-gray-400 font-mono select-none">
            <span className="w-10 text-right">{formatWaktu(waktuSekarang)}</span>
            <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden relative">
               <div className="h-full bg-red-500 rounded-full transition-all duration-300 ease-linear" style={{ width: `${persentase}%` }}></div>
            </div>
            <span className="w-10 text-left">{formatWaktu(totalDurasi)}</span>
          </div>
        </div>

        {/* Kanan Kosong */}
        <div className="w-1/4"></div>
      </div>

    </div>
  );
};

export default PlayerControl;