import { Users, MapPin, Route, Lightbulb, Droplets, Home, GraduationCap, Hospital, TreePine, Store, Landmark, Baby } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const cards = [
    { title: 'Total Population', value: '9,804', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', progress: 85 },
    { title: 'Total Wards', value: '17', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-100', progress: 100 },
    { title: 'Total Road Length', value: '45.2 km', icon: Route, color: 'text-green-600', bg: 'bg-green-100', progress: 75 },
    { title: 'Street Lights', value: '1,250', icon: Lightbulb, color: 'text-yellow-600', bg: 'bg-yellow-100', progress: 92 },
    { title: 'Water Connections', value: '2,350', icon: Droplets, color: 'text-cyan-600', bg: 'bg-cyan-100', progress: 88 },
    { title: 'Households', value: '2,158', icon: Home, color: 'text-orange-600', bg: 'bg-orange-100', progress: 95 },
    { title: 'Schools', value: '8', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-100', progress: 100 },
    { title: 'Hospitals / Clinics', value: '3', icon: Hospital, color: 'text-red-600', bg: 'bg-red-100', progress: 60 },
    { title: 'Parks & Garden', value: '4', icon: TreePine, color: 'text-emerald-600', bg: 'bg-emerald-100', progress: 70 },
    { title: 'Markets', value: '2', icon: Store, color: 'text-teal-600', bg: 'bg-teal-100', progress: 80 },
    { title: 'Banks', value: '5', icon: Landmark, color: 'text-slate-600', bg: 'bg-slate-100', progress: 100 },
    { title: 'Anganwadis', value: '6', icon: Baby, color: 'text-pink-600', bg: 'bg-pink-100', progress: 90 },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Overview Dashboard</h1>
            <p className="text-gray-500">Key statistics and complete civic overview of Godhani Nagar Panchayat.</p>
          </div>
          <div className="text-sm text-gray-400 hidden md:block">
            Last Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">{card.title}</h3>
                <div className="text-2xl font-bold text-gray-900 mb-4">{card.value}</div>
                
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    className={`h-1.5 rounded-full ${card.color.replace('text-', 'bg-')}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${card.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
