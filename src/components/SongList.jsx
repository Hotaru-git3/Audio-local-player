import React, { useState } from 'react';
import { Play, Clock, Search } from 'lucide-react';

const SongList = ({ daftarLagu, laguAktif, fungsiGantiLagu, menuAktif }) => {
  const infoAlbum = daftarLagu[0];
  const [kataKunci, setKataKunci] = useState("");

  const laguTampil = daftarLagu.filter(lagu => 
    lagu.judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
    lagu.artis.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    // PERUBAHAN PENTING: pt-16 (Mobile) agar tidak ketutup Header, md:pt-0 (Desktop) reset padding
    <div className="flex-1 h-full overflow-y-auto bg-white pb-24 pt-16 md:pt-0">
      
      {/* HERO SECTION */}
      {menuAktif === 'beranda' && (
        <div className="p-6 md:p-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-end text-center md:text-left">
            <img 
              src={infoAlbum.cover} 
              alt="Album" 
              className="w-40 h-40 md:w-52 md:h-52 rounded-2xl shadow-2xl object-cover transform transition-transform duration-500 hover:scale-105"
            />
            <div>
              <h4 className="text-xs md:text-sm font-bold text-red-500 uppercase mb-2 tracking-wider animate-pulse">Album Terbaru</h4>
              <h1 className="text-3xl md:text-6xl font-black text-gray-900 mb-2 leading-tight">
                {infoAlbum.album}
              </h1>
              <p className="text-gray-500 font-medium text-sm md:text-lg">
                {infoAlbum.artis} • 2025
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH */}
      {menuAktif === 'cari' && (
        <div className="p-4 md:p-8 sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-gray-100">
          <div className="relative group">
            <Search className="absolute left-4 top-3.5 text-gray-400 group-hover:text-red-500 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Cari judul lagu atau artis..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-sm md:text-base focus:bg-white shadow-inner"
              onChange={(e) => setKataKunci(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* LIST LAGU */}
      <div className="px-4 md:px-12 pt-4">
        {laguTampil.length === 0 ? (
          <div className="text-center text-gray-400 py-10 text-sm">Lagu tidak ditemukan...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[10px] md:text-xs uppercase border-b border-gray-100">
                <th className="py-3 w-8 md:w-12 text-center">#</th>
                <th className="py-3">Judul</th>
                <th className="py-3 hidden md:table-cell">Album</th>
                <th className="py-3 text-right"><Clock size={14} className="ml-auto"/></th>
              </tr>
            </thead>
            <tbody>
              {laguTampil.map((lagu, index) => (
                <tr 
                  key={lagu.id}
                  onClick={() => fungsiGantiLagu(lagu)}
                  className={`
                    group cursor-pointer transition-all duration-200 rounded-xl border-b border-gray-50 last:border-0
                    hover:bg-gray-50 hover:shadow-md hover:scale-[1.01] hover:z-10 relative
                    active:scale-[0.98] active:bg-red-50
                    ${laguAktif.id === lagu.id ? "bg-red-50/60 border-l-4 border-red-500" : "bg-white"}
                  `}
                >
                  <td className="py-3 md:py-4 text-center text-gray-400 font-medium text-xs md:text-sm group-hover:text-red-500 transition-colors">
                     {laguAktif.id === lagu.id ? <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full mx-auto animate-ping"/> : index + 1}
                  </td>
                  <td className="py-3 md:py-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <img src={lagu.cover} className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover shadow-sm group-hover:shadow-md transition-shadow" />
                      <div className="min-w-0">
                        <p className={`font-semibold text-sm md:text-base truncate pr-2 transition-colors ${laguAktif.id === lagu.id ? "text-red-500" : "text-gray-900 group-hover:text-black"}`}>
                          {lagu.judul}
                        </p>
                        <p className="text-xs text-gray-500 md:hidden truncate">{lagu.artis}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-gray-500 text-sm hidden md:table-cell">{lagu.album}</td>
                  <td className="py-4 text-right text-gray-400 text-xs md:text-sm pr-2 font-mono">
                    {lagu.durasi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SongList;