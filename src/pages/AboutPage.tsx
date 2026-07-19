import { MapPin, Users, Calendar, Award, BookOpen, Baby, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const quickFacts = [
    { label: 'Population', value: '9,804', icon: Users },
    { label: 'Families', value: '2,158', icon: Home },
    { label: 'Literacy Rate', value: '90.78%', icon: BookOpen },
    { label: 'Sex Ratio', value: '946', icon: Users },
    { label: 'Child Population (0-6)', value: '1,012', icon: Baby },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16">
      {/* Hero Section */}
      <div className="bg-primary pt-12 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            About Godhani
          </motion.h1>
          <p className="text-white/80 max-w-2xl text-lg">
            A fast-developing town in Nagpur Rural Taluka transitioning into a modern Nagar Panchayat, combining urban amenities with a serene environment.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey & Heritage</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Godhani is a prominent railway station and a rapidly developing urban area located in the Nagpur district of Maharashtra. Once a serene village, it has now evolved into a bustling town owing to its strategic location and excellent connectivity to Nagpur city.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Upgraded to a Nagar Panchayat in 2025, Godhani is currently undergoing massive infrastructural developments, aiming to provide a high standard of living, clean environment, and transparent civic administration to all its residents.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 text-primary mr-3" />
                  <span className="font-medium w-40">Location:</span>
                  <span>Nagpur Rural, Nagpur, Maharashtra</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Award className="w-5 h-5 text-primary mr-3" />
                  <span className="font-medium w-40">PIN Code:</span>
                  <span>441123</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 text-primary mr-3" />
                  <span className="font-medium w-40">NP Formation:</span>
                  <span>2025</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-64 md:h-96 lg:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1621360841013-c76831fdbcf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Godhani Railway Station / Town" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Quick Facts Grid */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 px-2">Demographics & Quick Facts</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {quickFacts.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                >
                  <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-[#1B5E20]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{fact.value}</div>
                  <div className="text-sm font-medium text-gray-500">{fact.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
