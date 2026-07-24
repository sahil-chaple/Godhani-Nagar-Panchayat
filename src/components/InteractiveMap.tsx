import { useState, useEffect } from 'react';
import { MAP_MARKERS } from '../data/portalData';
import { MapMarker } from '../types';
import { MapPin, Info, Compass, School, Building, Flame, Landmark, Train, ShieldAlert, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { renderToStaticMarkup } from 'react-dom/server';

function MapUpdater({ selectedMarker }: { selectedMarker: MapMarker | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedMarker) {
      map.flyTo([selectedMarker.latitude, selectedMarker.longitude], 16, { animate: true, duration: 1.5 });
    }
  }, [selectedMarker, map]);
  return null;
}

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

  const createCustomIcon = (category: string, isSelected: boolean) => {
    const colorClass = getMarkerColor(category);
    const iconElement = getMarkerIcon(category);

    const iconHtml = renderToStaticMarkup(
      <div className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-md transition-all duration-300 ring-2 ${isSelected ? 'scale-125 ring-white shadow-red-950/30 ' + colorClass.split(' ')[0] : 'scale-100 ring-transparent hover:scale-110 ' + colorClass.split(' ')[0]
        }`}>
        {iconElement}
      </div>
    );

    return L.divIcon({
      html: `
        <div class="relative group cursor-pointer">
          ${isSelected ? `<span class="absolute inline-flex h-10 w-10 rounded-full opacity-75 -left-1 -top-1 animate-ping ${colorClass.split(' ')[0]}"></span>` : ''}
          ${iconHtml}
        </div>
      `,
      className: 'custom-leaflet-icon bg-transparent border-none', // Important to remove Leaflet default white borders
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
  };

  const mapCenter: [number, number] = [21.2183, 79.0883];

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
      <motion.div layout className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${activeCategory === cat.key
              ? 'bg-[#800000] text-white shadow-sm'
              : 'bg-white text-gray-700 border border-[#E5E3D8] hover:bg-gray-50'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Stage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-2/3 relative bg-[#EFECE1] border border-[#DCD9C9] rounded-xl h-[420px] overflow-hidden shadow-inner flex items-center justify-center z-0"
        >
          <MapContainer
            center={mapCenter}
            zoom={15}
            style={{ width: '100%', height: '100%', zIndex: 0 }}
            zoomControl={true}
            scrollWheelZoom={true}
            touchZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapUpdater selectedMarker={selectedMarker} />

            {filteredMarkers.map((marker) => {
              const isSelected = selectedMarker?.id === marker.id;
              return (
                <Marker
                  key={marker.id}
                  position={[marker.latitude, marker.longitude]}
                  icon={createCustomIcon(marker.category, isSelected)}
                  eventHandlers={{
                    click: () => {
                      setSelectedMarker(marker);
                    },
                  }}
                >
                  <Popup className="rounded-lg shadow-sm">
                    <div className="p-1 min-w-[200px]">
                      <div className="font-bold text-sm text-gray-900 mb-1">{marker.name}</div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{marker.category}</div>
                      <p className="text-xs text-gray-600 mb-3">{marker.description}</p>
                      <button
                        onClick={() => {
                          if (selectedMarker.googleMapsUrl) {
                            window.open(selectedMarker.googleMapsUrl, "_blank");
                          }
                        }} className="w-full bg-[#800000] text-white py-1.5 rounded text-xs hover:bg-[#9B1A1A] transition-colors cursor-pointer"
                      >
                        Open in Google Maps
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </motion.div>

        {/* Selected Place Details Panel */}
        <motion.div
          layout
          className="lg:w-1/3 bg-white border border-[#E5E3D8] rounded-xl p-5 flex flex-col justify-between shadow-xs z-10"
        >
          <AnimatePresence mode="wait">
            {selectedMarker ? (
              <motion.div
                key={selectedMarker.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 h-full flex flex-col"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white ${getMarkerColor(selectedMarker.category).split(' ')[0]
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
                      Lat: {selectedMarker.latitude.toFixed(4)}°N, Lng: {selectedMarker.longitude.toFixed(4)}°E
                    </p>
                  </div>

                  <div className="border-t border-b border-gray-100 py-3 mt-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      Description / Amenities
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedMarker.description}
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-3 border border-red-150 mt-4">
                    <div className="text-xs font-semibold text-red-950 mb-1 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5" />
                      Accessibility & Services
                    </div>
                    <p className="text-xs text-red-900 leading-normal">
                      Open to general public. Accessible for people with disabilities. CCTV secured premises with 24/7 solar backups.
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <button
                    onClick={() => {
                      if (selectedMarker.googleMapsUrl) {
                        window.open(selectedMarker.googleMapsUrl, "_blank");
                      }
                    }} className="w-full py-2.5 bg-[#800000] text-white font-medium text-sm rounded-lg hover:bg-[#9B1A1A] transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <Compass className="w-4 h-4" />
                    Open in Google Maps
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center py-12 text-gray-400"
              >
                <MapPin className="w-12 h-12 stroke-1 mb-2 animate-bounce text-[#9B1A1A]" />
                <p className="text-sm">Select a place from the map to see comprehensive village details.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
