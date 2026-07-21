import { useState } from 'react';
import { MAP_MARKERS } from '../data/portalData';
import { MapMarker } from '../types';
import { MapPin, Info, Compass, School, Home, Building, Flame, Landmark, Train, ShieldAlert, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

export default function InteractiveMap() {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(MAP_MARKERS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { key: 'All', label: 'All Places', color: 'bg-[#800000]' },
    { key: 'Office', label: 'Panchayat Office', color: 'bg-[#9B1A1A]' },
    { key: 'School', label: 'Schools', color: 'bg-blue-600' },
    { key: 'Hospital', label: 'Hospitals', color: 'bg-rose-600' },
    { key: 'Railway', label: 'Railway Station', color: 'bg-amber-600' },
    { key: 'Bank', label: 'Banks', color: 'bg-indigo-600' },
    { key: 'Temple', label: 'Temples', color: 'bg-orange-600' },
    { key: 'BusStop', label: 'Bus Stops', color: 'bg-teal-600' },
    { key: 'Park', label: 'Parks & Recreation', color: 'bg-green-600' },
  ];

  const filteredMarkers = activeCategory === 'All'
    ? MAP_MARKERS
    : MAP_MARKERS.filter(m => m.category === activeCategory);

  const getMarkerIcon = (category: string) => {
    switch (category) {
      case 'Office': return <Building className="w-4 h-4 text-white" />;
      case 'School': return <School className="w-4 h-4 text-white" />;
      case 'Hospital': return <ShieldAlert className="w-4 h-4 text-white" />;
      case 'Railway': return <Train className="w-4 h-4 text-white" />;
      case 'Bank': return <Landmark className="w-4 h-4 text-white" />;
      case 'Temple': return <Flame className="w-4 h-4 text-white" />;
      case 'BusStop': return <Navigation className="w-4 h-4 text-white" />;
      case 'Park': return <Compass className="w-4 h-4 text-white" />;
      default: return <MapPin className="w-4 h-4 text-white" />;
    }
  };

  const getMarkerColor = (category: string) => {
    switch (category) {
      case 'Office': return 'bg-[#800000] ring-red-300';
      case 'School': return 'bg-blue-600 ring-blue-300';
      case 'Hospital': return 'bg-rose-600 ring-rose-300';
      case 'Railway': return 'bg-amber-600 ring-amber-300';
      case 'Bank': return 'bg-indigo-600 ring-indigo-300';
      case 'Temple': return 'bg-orange-600 ring-orange-300';
      case 'BusStop': return 'bg-teal-600 ring-teal-300';
      case 'Park': return 'bg-green-600 ring-green-300';
      default: return 'bg-gray-600 ring-gray-300';
    }
  };

  return (
    <div className="dark:bg-slate-900 bg-[#FAF9F5] border border-[#E5E3D8] rounded-2xl p-6" id="interactive-map-sec">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#800000] dark:text-[#C25050] flex items-center gap-2">
            <Compass className="w-6 h-6 " />
            Our Village Map
          </h2>
          <p className="text-sm text-amber-50">Interactive overview of key sites, offices, and landmarks in Godhani Nagar Panchayat</p>
        </div>
        <div className="mt-3 md:mt-0 bg-[#E8E5D5] px-3 py-1.5 rounded-full text-xs font-mono text-[#800000] border border-[#DCD9C9]">
          Showing {filteredMarkers.length} Active Hotspots
        </div>
      </div>

      {/* Category Badges Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === cat.key
                ? 'bg-[#800000] text-white shadow-sm'
                : 'bg-white text-gray-700 border border-[#E5E3D8] hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Stage */}
        <div className="lg:col-span-2 relative bg-[#EFECE1] border border-[#DCD9C9] rounded-xl h-[420px] overflow-hidden shadow-inner flex items-center justify-center">
          {/* Custom SVG Stylized Map Layout Background */}
          <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D3CFBD" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Simulated River/Canal */}
            <path d="M -50 180 Q 200 120 400 240 T 900 210" fill="none" stroke="#B4D5E6" strokeWidth="24" strokeLinecap="round" />
            <path d="M -50 180 Q 200 120 400 240 T 900 210" fill="none" stroke="#CBE4F0" strokeWidth="8" strokeLinecap="round" />

            {/* Simulated Roads/Highways */}
            <path d="M 150 -50 L 150 500" fill="none" stroke="#D1CDB5" strokeWidth="18" />
            <path d="M 150 -50 L 150 500" fill="none" stroke="#FAF8F0" strokeWidth="2" strokeDasharray="5,5" />

            <path d="M -50 250 L 900 250" fill="none" stroke="#D1CDB5" strokeWidth="18" />
            <path d="M -50 250 L 900 250" fill="none" stroke="#FAF8F0" strokeWidth="2" strokeDasharray="5,5" />

            <path d="M 50 100 Q 400 100 400 450" fill="none" stroke="#D6D1BE" strokeWidth="10" />

            {/* Green Fields */}
            <rect x="30" y="20" width="100" height="60" rx="10" fill="#E2EAD3" />
            <rect x="520" y="40" width="120" height="90" rx="10" fill="#E2EAD3" />
            <rect x="610" y="280" width="140" height="110" rx="10" fill="#DCE6CA" />
            <rect x="50" y="320" width="80" height="80" rx="10" fill="#E2EAD3" />

            {/* Railway Track */}
            <path d="M -50 80 L 900 80" fill="none" stroke="#908E83" strokeWidth="4" />
            <path d="M -50 80 L 900 80" fill="none" stroke="#B8B6AD" strokeWidth="6" strokeDasharray="2,8" />
          </svg>

          {/* Map Compass Rose */}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-[#D5D2C0] text-gray-500 flex flex-col items-center justify-center text-[10px] font-bold">
            <span className="text-[#800000]">N</span>
            <div className="w-5 h-5 border-t-2 border-r-2 border-[#800000] transform rotate-45 my-1"></div>
            <span>S</span>
          </div>

          {/* Interactive Custom Markers */}
          {filteredMarkers.map((marker) => {
            const isSelected = selectedMarker?.id === marker.id;
            return (
              <button
                key={marker.id}
                onClick={() => setSelectedMarker(marker)}
                style={{ left: `${marker.lng}%`, top: `${marker.lat}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none group z-10 cursor-pointer"
                id={`map-marker-${marker.id}`}
              >
                {/* Pulse Ring */}
                <span className={`absolute inline-flex h-10 w-10 rounded-full opacity-75 -left-3 -top-3 transition-all ${
                  isSelected ? 'animate-ping ' + getMarkerColor(marker.category) : 'scale-0 group-hover:scale-100 bg-gray-400/30'
                }`} />

                {/* Marker Pin */}
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-md transition-all duration-300 ring-2 ${
                  isSelected ? 'scale-125 ring-white shadow-red-950/30' : 'scale-100 ring-transparent group-hover:scale-110'
                } ${getMarkerColor(marker.category)}`}>
                  {getMarkerIcon(marker.category)}
                </div>

                {/* Micro Label */}
                <span className="absolute left-1/2 -translate-x-1/2 top-9 bg-[#111827]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-sm z-20">
                  {marker.name}
                </span>
              </button>
            );
          })}

          {/* Quick Help Toast inside Map */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs border border-[#E5E3D8] p-2 rounded-lg text-center text-xs text-gray-600 shadow-sm md:block hidden">
            ✨ Click on any colored marker on the map to view administrative details and local facilities.
          </div>
        </div>

        {/* Selected Place Details Panel */}
        <div className="bg-white border border-[#E5E3D8] rounded-xl p-5 flex flex-col justify-between shadow-xs">
          {selectedMarker ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white ${
                  getMarkerColor(selectedMarker.category).split(' ')[0]
                }`}>
                  {selectedMarker.category}
                </span>
                <span className="text-xs text-gray-400 font-mono">ID: {selectedMarker.id}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  {selectedMarker.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#9B1A1A]" />
                  Lat: {(selectedMarker.lat * 0.12 + 21.21).toFixed(4)}°N, Lng: {(selectedMarker.lng * 0.15 + 79.11).toFixed(4)}°E
                </p>
              </div>

              <div className="border-t border-b border-gray-100 py-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Description / Amenities
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedMarker.description}
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-3 border border-red-150">
                <div className="text-xs font-semibold text-red-950 mb-1 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  Accessibility & Services
                </div>
                <p className="text-xs text-red-900 leading-normal">
                  Open to general public. Accessible for people with disabilities. CCTV secured premises with 24/7 solar backups.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 text-gray-400">
              <MapPin className="w-12 h-12 stroke-1 mb-2 animate-bounce text-[#9B1A1A]" />
              <p className="text-sm">Select a place from the map to see comprehensive village details.</p>
            </div>
          )}

          {selectedMarker && (
            <button
              onClick={() => alert(`Directions initiated for ${selectedMarker.name}! Launching routing engine...`)}
              className="mt-6 w-full py-2.5 bg-[#800000] text-white font-medium text-sm rounded-lg hover:bg-[#9B1A1A] transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              Get Directions
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
