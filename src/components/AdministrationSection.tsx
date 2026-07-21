import { useState } from 'react';
import { ADMIN_MEMBERS } from '../data/portalData';
import { Councillor } from '../types';
import { Mail, Phone, ShieldCheck, Award, Target, Landmark, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdministrationSection() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'President' | 'Vice President' | 'Chief Officer' | 'Councillor'>('All');

  const categories: ('All' | 'President' | 'Vice President' | 'Chief Officer' | 'Councillor')[] = [
    'All', 'President', 'Vice President', 'Chief Officer', 'Councillor'
  ];

  const filteredMembers = activeCategory === 'All'
    ? ADMIN_MEMBERS
    : ADMIN_MEMBERS.filter(m => m.role === activeCategory);

  return (
    <div className="dark:bg-slate-900 border border-[#E5E3D8] rounded-2xl p-6 space-y-6" id="admin-profiles-sec">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E5E3D8] pb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#800000] dark:text-[#C25050] flex items-center gap-2">
            <Landmark className="w-6 h-6 " />
            Administrative Leadership
          </h2>
          <p className="text-xs text-gray-500 mt-1">Dedicated representatives and chief civil officers serving the 17 wards of Godhani.</p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5 mt-4 md:mt-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#800000] text-white shadow-sm'
                  : 'bg-[#FAF9F5] text-gray-700 border border-[#E5E3D8] hover:bg-gray-50'
              }`}
            >
              {cat === 'All' ? 'View All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMembers.map((member) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              key={member.id}
              className="bg-[#FAF9F5] border border-[#E5E3D8] rounded-xl overflow-hidden shadow-2xs hover:shadow transition-all group flex flex-col justify-between"
            >
              {/* Profile Card Header with beautiful color theme */}
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={member.photo}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#800000] group-hover:scale-105 transition-transform duration-300 shadow-xs"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#800000] text-white p-1 rounded-full shadow-md">
                      <ShieldCheck className="w-3 h-3" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 group-hover:text-[#800000] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[#800000] flex items-center gap-1 mt-0.5">
                      <Award className="w-3.5 h-3.5" />
                      {member.role}
                    </p>
                    {member.ward && (
                      <span className="inline-block bg-slate-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded mt-1">
                        Ward No {member.ward} Representative
                      </span>
                    )}
                  </div>
                </div>

                {/* Vision Quote Block */}
                <div className="bg-[#FAF9F5] border-l-2 border-[#800000] rounded-r-lg p-3.5 relative min-h-[90px] flex items-center">
                  <Quote className="w-8 h-8 text-[#800000]/10 absolute top-1 right-2 pointer-events-none" />
                  <p className="text-xs text-gray-600 italic leading-relaxed relative z-10">
                    "{member.vision}"
                  </p>
                </div>
              </div>

              {/* Contacts Footer */}
              <div className="bg-[#FAF9F5] border-t border-[#E5E3D8] px-5 py-3 text-xs text-gray-500 font-mono space-y-1.5">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#9B1A1A]" />
                  <a href={`mailto:${member.email}`} className="hover:underline hover:text-[#800000] truncate">
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#9B1A1A]" />
                  <a href={`tel:${member.phone}`} className="hover:underline hover:text-[#800000]">
                    {member.phone}
                  </a>
                </div>
                <div className="border-t border-gray-200/55 pt-1.5 flex justify-between text-[10px] uppercase font-bold text-gray-400">
                  <span>Active Term</span>
                  <span className="text-[#800000]">{member.term}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
