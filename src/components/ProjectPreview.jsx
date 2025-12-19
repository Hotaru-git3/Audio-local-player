import React from 'react';
import { dataProjects } from '../data/projects';
import { ExternalLink, PlayCircle } from 'lucide-react';

const ProjectGallery = () => {
  // Fungsi buat handle klik card
  const handleCardClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert("Link project belum tersedia nih, bro!");
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white pb-40 pt-20 md:pt-10 px-6 md:px-12 animate-fade-in">
      {/* HEADER SECTION */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
            <PlayCircle size={24} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Project Gallery</h1>
        </div>
        <p className="text-gray-500 font-medium">Kumpulan dokumentasi dan preview project kelompok 3.</p>
      </header>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {dataProjects.map((project) => (
          <div 
            key={project.id} 
            // Tambahin onClick di sini
            onClick={() => handleCardClick(project.link)} 
            className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
          >
            {/* VIDEO CONTAINER */}
            <div className="aspect-video bg-black relative overflow-hidden">
              <video 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                controls
                // e.stopPropagation biar pas klik tombol play video, link-nya gak ikut kebuka
                onClick={(e) => e.stopPropagation()} 
                src={project.videoUrl}
              />
            </div>

            {/* INFO CONTENT */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-xl group-hover:text-red-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-red-500 font-semibold tracking-wide">Dev: {project.developer}</p>
                </div>
                {/* Tombol icon buat pemanis/opsional klik juga */}
                <div className="p-2 text-gray-400 group-hover:text-red-500 transition-colors">
                  <ExternalLink size={20} />
                </div>
              </div>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-gray-200 text-[10px] font-bold uppercase rounded-full text-gray-400 group-hover:border-red-200 group-hover:text-red-400 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;