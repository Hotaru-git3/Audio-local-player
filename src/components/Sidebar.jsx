import React from 'react';
import { Music, Home, Search, Info, X, Gamepad2, Video } from 'lucide-react'; 

const Sidebar = ({ menuAktif, gantiMenu, isOpen, onClose }) => {
  return (
    <>
      {/* MOBILE BACKDROP */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* SIDEBAR UTAMA */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-50 border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out flex flex-col p-6 h-full
        md:static md:translate-x-0 
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        
        {/* Header Sidebar */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2 text-red-500 font-bold text-l tracking-tight">
            <Music size={28} />
            <span>Kelompok 3 Music's</span>
          </div>
          <button onClick={onClose} className="md:hidden p-1 text-gray-500 hover:bg-gray-200 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          <NavItem 
            icon={<Home size={20} />} 
            label="Beranda" 
            active={menuAktif === 'beranda'} 
            onClick={() => { gantiMenu('beranda'); onClose(); }} 
          />
          <NavItem 
            icon={<Search size={20} />} 
            label="Cari" 
            active={menuAktif === 'cari'} 
            onClick={() => { gantiMenu('cari'); onClose(); }} 
          />
          
          {/* MENU GAME MODE */}
          <NavItem 
            icon={<Gamepad2 size={20} />} 
            label="Story Mode" 
            active={menuAktif === 'game'} 
            onClick={() => { gantiMenu('game'); onClose(); }} 
          />

          {/* MENU BARU: PROJECT GALLERY (VIDEOS) */}
          <NavItem 
            icon={<Video size={20} />} 
            label="Project Gallery" 
            active={menuAktif === 'projects'} 
            onClick={() => { gantiMenu('projects'); onClose(); }} 
          />

          <NavItem 
            icon={<Info size={20} />} 
            label="About" 
            active={menuAktif === 'about'} 
            onClick={() => { gantiMenu('about'); onClose(); }} 
          />
        </div>

        <div className="mt-auto text-xs text-gray-400 md:hidden">
          &copy; 2025 Herta Music App
        </div>
      </div>
    </>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-colors
    ${active ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-100 hover:cursor-pointer hover:text-gray-900'}`}>
    {icon}
    <span>{label}</span>
  </button>
);

export default Sidebar;