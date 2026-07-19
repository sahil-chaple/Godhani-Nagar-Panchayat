import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ['All', 'Festivals', 'Events', 'Development', 'Places', 'Others'];

  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1517592471694-ca1375ba3828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Festivals' },
    { id: 2, src: 'https://images.unsplash.com/photo-1582450871972-c5ca1dc89808?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Places' },
    { id: 3, src: 'https://images.unsplash.com/photo-1522851578330-9eb3936a1885?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Events' },
    { id: 4, src: 'https://images.unsplash.com/photo-1541888031-6453995166ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Development' },
    { id: 5, src: 'https://images.unsplash.com/photo-1621360841013-c76831fdbcf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Places' },
    { id: 6, src: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Development' },
    { id: 7, src: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Others' },
    { id: 8, src: 'https://images.unsplash.com/photo-1555529733-0e67056058e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Development' },
  ];

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h1>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === c 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout Approximation with CSS Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative group rounded-xl overflow-hidden cursor-pointer shadow-sm border border-gray-100 mb-4 break-inside-avoid"
                onClick={() => setSelectedImage(img.src)}
              >
                <img 
                  src={img.src} 
                  alt="Gallery" 
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center">
          <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md">
            View All Photos
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <button 
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50 p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              src={selectedImage}
              alt="Fullscreen"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain border-4 border-white/10"
            />
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
