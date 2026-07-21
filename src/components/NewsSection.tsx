import { useState } from 'react';
import { NEWS_ITEMS } from '../data/portalData';
import { NewsItem } from '../types';
import { Search, Calendar, FileText, BadgeInfo, Flame, Filter, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState<'All' | 'Notice' | 'Tender' | 'Announcement'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filteredNews = NEWS_ITEMS.filter((item) => {
    const matchesTab = activeTab === 'All' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'Notice': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Tender': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Announcement': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="dark:bg-slate-900 border border-[#E5E3D8] rounded-2xl p-6 space-y-6" id="news-notices-board-sec">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E5E3D8] pb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#800000] dark:text-[#C25050] flex items-center gap-2">
            <BellRing className="w-6 h-6 " />
            Official Bulletin & Tenders
          </h2>
          <p className="text-xs text-amber-50 mt-1">Stay updated with current tenders, active announcements, and general notices in real-time.</p>
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap gap-1.5">
          {['All', 'Notice', 'Tender', 'Announcement'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === type
                  ? 'bg-[#800000] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-[#E5E3D8] hover:bg-gray-50'
              }`}
            >
              {type === 'All' ? 'All Bulletins' : `${type}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notices, tender titles, reference IDs, or keywords..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E3D8] text-sm text-gray-900 bg-white focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none"
        />
      </div>

      {/* Timeline Layout */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                key={news.id}
                onClick={() => setSelectedNews(news)}
                className="bg-white border border-[#E5E3D8] p-4 rounded-xl shadow-2xs hover:shadow transition-all flex gap-4 items-start cursor-pointer group"
              >
                {/* Simulated Calendar Sheet Block (Panel 12 style) */}
                <div className="w-14 h-16 bg-[#FAF9F5] border border-[#E5E3D8] rounded-lg overflow-hidden flex flex-col items-center justify-center shrink-0">
                  <span className="w-full bg-[#800000] text-white text-[9px] font-bold text-center py-0.5 uppercase tracking-wider">
                    {news.month}
                  </span>
                  <span className="text-xl font-extrabold text-gray-800 py-1.5">
                    {news.date}
                  </span>
                </div>

                {/* News Details */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${getBadgeStyles(news.type)}`}>
                      {news.type}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Ref ID: {news.id}</span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-[#800000] transition-colors leading-snug">
                    {news.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {news.description}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white border border-[#E5E3D8] text-gray-500 rounded-xl py-12 text-center text-sm font-mono flex flex-col items-center justify-center gap-2 shadow-2xs">
              <FileText className="w-10 h-10 text-gray-300 stroke-1" />
              <span>No bulletins or active tenders match your current query or tab filter.</span>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* FULL NEWS READ MODAL OVERLAY */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full border border-gray-200 shadow-xl overflow-hidden relative z-10"
            >
              <div className="bg-[#FAF9F5] border-b border-gray-150 p-5 flex items-start gap-3">
                <div className="w-12 h-14 bg-white border border-[#E5E3D8] rounded-md overflow-hidden flex flex-col items-center justify-center shrink-0">
                  <span className="w-full bg-[#800000] text-white text-[8px] font-bold text-center py-0.5 uppercase">
                    {selectedNews.month}
                  </span>
                  <span className="text-base font-black text-gray-800">
                    {selectedNews.date}
                  </span>
                </div>

                <div className="flex-1">
                  <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border mb-1 ${getBadgeStyles(selectedNews.type)}`}>
                    {selectedNews.type}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug">{selectedNews.title}</h4>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-gray-700 leading-relaxed font-sans">
                  {selectedNews.description}
                </p>

                <div className="bg-red-50 rounded-lg p-3 border border-red-200 flex items-start gap-2 text-[11px] text-[#800000] font-mono">
                  <BadgeInfo className="w-4 h-4 text-[#9B1A1A] shrink-0 mt-0.5" />
                  <span>
                    <strong>Official Notice Extract:</strong> Published by the Chief Secretary of Godhani Nagar Panchayat under official seal reference ID {selectedNews.id}. Copies can be procured directly from desk windows.
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-mono">
                <span>Date: {selectedNews.date} {selectedNews.month}, 2026</span>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-4 py-2 bg-[#800000] hover:bg-[#9B1A1A] text-white rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  Close Bulletin
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
