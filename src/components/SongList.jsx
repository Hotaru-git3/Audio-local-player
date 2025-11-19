import React, { useState } from "react";
import { Play, Clock, Search } from "lucide-react";

const SongList = ({ daftarLagu, laguAktif, fungsiGantiLagu, menuAktif }) => {
  const infoAlbum = daftarLagu[0];

  // State khusus untuk kotak pencarian
  const [kataKunci, setKataKunci] = useState("");

  // LOGIKA FILTER PENCARIAN
  // Kalau kataKunci kosong, tampilkan semua. Kalau ada isi, cari yang cocok.
  const laguTampil = daftarLagu.filter(
    (lagu) =>
      lagu.judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
      lagu.artis.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white">
      
      {/* --- JIKA MENU BERANDA --- */}
      {menuAktif === 'beranda' && (
        // PERBAIKAN: p-6 untuk HP, md:p-12 untuk Laptop
        <div className="p-6 md:p-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-end text-center md:text-left">
            {/* PERBAIKAN: Gambar lebih kecil di HP (w-40) */}
            <img 
              src={infoAlbum.cover} 
              alt="Album" 
              className="w-40 h-40 md:w-52 md:h-52 rounded-xl shadow-2xl object-cover"
            />
            <div>
              <h4 className="text-xs md:text-sm font-bold text-red-500 uppercase mb-2 tracking-wider">Album Terbaru</h4>
              {/* PERBAIKAN: Font size responsif text-3xl di HP */}
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

      {/* --- JIKA MENU CARI --- */}
      {menuAktif === 'cari' && (
        <div className="p-4 md:p-8 sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Cari lagu..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition text-sm md:text-base"
              onChange={(e) => setKataKunci(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* --- DAFTAR LAGU --- */}
      {/* PERBAIKAN: px-4 untuk HP agar tabel lebih lebar */}
      <div className="px-4 md:px-12 pb-32 pt-4">
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
                  className={`group cursor-pointer hover:bg-gray-50 transition rounded-lg border-b border-gray-50 last:border-0
                    ${laguAktif.id === lagu.id ? "bg-red-50/50" : ""}`}
                >
                  <td className="py-3 md:py-4 text-center text-gray-400 font-medium text-xs md:text-sm">
                     {laguAktif.id === lagu.id ? <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full mx-auto animate-ping"/> : index + 1}
                  </td>
                  <td className="py-3 md:py-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* Gambar kecil di list */}
                      <img src={lagu.cover} className="w-10 h-10 md:w-12 md:h-12 rounded object-cover shadow-sm" />
                      <div className="min-w-0"> {/* min-w-0 penting buat truncate */}
                        <p className={`font-semibold text-sm md:text-base truncate pr-2 ${laguAktif.id === lagu.id ? "text-red-500" : "text-gray-900"}`}>
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
