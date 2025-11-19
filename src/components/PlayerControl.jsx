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
    <div className="fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-50">
      <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 max-w-screen-2xl mx-auto h-20 md:h-24">
        
        {/* INFO LAGU (Kiri) */}
        <div className="flex items-center gap-3 md:gap-4 w-auto md:w-1/4 max-w-[40%] md:max-w-none flex-shrink-0">
          <img 
            src={laguAktif.cover} 
            alt="Cover" 
            className="w-10 h-10 md:w-14 md:h-14 rounded-md md:rounded-lg shadow-sm object-cover border border-gray-100" 
          />
          <div className="overflow-hidden">
            <h4 className="text-xs md:text-sm font-bold text-gray-900 truncate">{laguAktif.judul}</h4>
            <p className="text-[10px] md:text-xs text-gray-500 truncate">{laguAktif.artis}</p>
          </div>
        </div>

        {/* KONTROL (Tengah) */}
        <div className="flex-1 flex flex-col items-center justify-center px-2 md:px-0">
          <div className="flex items-center gap-4 md:gap-8 mb-1 md:mb-2">
            <button onClick={onPrev} className="text-gray-400 hover:text-gray-900 transition">
              <SkipBack size={20} className="md:w-6 md:h-6" fill="currentColor"/>
            </button>
            
            <button 
              onClick={fungsiPlayPause}
              className="bg-red-500 text-white w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-red-600 transition shadow-lg active:scale-95 flex-shrink-0"
            >
              {statusMain ? 
                <Pause size={18} className="md:w-6 md:h-6" fill="currentColor" /> : 
                <Play size={18} className="md:w-6 md:h-6 ml-0.5" fill="currentColor"/>
              }
            </button>
            
            <button onClick={onNext} className="text-gray-400 hover:text-gray-900 transition">
              <SkipForward size={20} className="md:w-6 md:h-6" fill="currentColor"/>
            </button>
          </div>
          
          <div className="w-full flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-400 font-mono select-none mt-2 md:mt-0">
            <span className="w-8 md:w-10 text-right hidden xs:block">{formatWaktu(waktuSekarang)}</span>
            <div className="h-1 md:h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden relative">
               <div 
                className="h-full bg-red-500 rounded-full transition-all duration-300 ease-linear"
                style={{ width: `${persentase}%` }}
              ></div>
            </div>
            <span className="w-8 md:w-10 text-left hidden xs:block">{formatWaktu(totalDurasi)}</span>
          </div>
        </div>

        {/* KANAN (Kosong/Spacer) */}
        <div className="hidden md:block w-1/4"></div>
      </div>
    </div>
  );
};

export default PlayerControl;