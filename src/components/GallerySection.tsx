import { useState } from 'react';
import { GALLERY_ITEMS } from '../data/portalData';
import { GalleryItem } from '../types';
import { ZoomIn, Calendar, X, ChevronLeft, ChevronRight, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Festival', 'Roads', 'Schools', 'Temples', 'Development', 'Events'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextSlide = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevSlide = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="bg-slate-900 border border-[#E5E3D8] rounded-2xl p-6 space-y-6" id="gallery-masonry-sec">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E3D8] pb-4">
        <div>
          <h2 className="text-2xl font-bold  text-[#C25050] flex items-center gap-2">
            <Image className="w-6 h-6 " />
            Nagar Panchayat Photo Gallery
          </h2>
          <p className="text-xs text-gray-500 mt-1">Glimpses of local infrastructure developments, heritage temples, and cultural public festivals in Godhani.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#800000] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-[#E5E3D8] hover:bg-gray-50'
              }`}
            >
              {cat === 'All' ? 'View All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-Style Grid Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="break-inside-avoid bg-white border border-[#E5E3D8] rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer group relative"
            >
              {/* Image Container with Zoom hover */}
              <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Dark Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-[#111827]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/95 p-3 rounded-full text-[#800000] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                <span className="absolute top-3 left-3 bg-[#111827]/75 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              {/* Caption details */}
              <div className="p-4 space-y-1">
                <h3 className="text-xs font-extrabold text-gray-900 group-hover:text-[#800000] transition-colors leading-normal">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 p-4 select-none">
            {/* Header Toolbar */}
            <div className="flex items-center justify-between text-white p-2">
              <div className="text-xs font-mono">
                Item {lightboxIndex + 1} of {filteredItems.length} | {filteredItems[lightboxIndex].category}
              </div>
              <button
                onClick={closeLightbox}
                className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Stage containing main Image with swipe handles */}
            <div className="flex-1 flex items-center justify-between relative max-w-5xl mx-auto w-full">
              <button
                onClick={prevSlide}
                className="absolute left-2 z-10 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="w-full h-full flex flex-col items-center justify-center p-2">
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              <button
                onClick={nextSlide}
                className="absolute right-2 z-10 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Footer with caption */}
            <div className="text-center text-white p-4 max-w-2xl mx-auto space-y-1.5">
              <h4 className="text-sm font-bold tracking-wide">
                {filteredItems[lightboxIndex].title}
              </h4>
              <p className="text-xs text-gray-400 font-mono flex items-center justify-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Captured on {filteredItems[lightboxIndex].date}
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
