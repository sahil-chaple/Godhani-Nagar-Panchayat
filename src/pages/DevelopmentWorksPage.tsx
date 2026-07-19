import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function DevelopmentWorksPage() {
  const [filter, setFilter] = useState('All Works');

  const filters = ['All Works', 'Ongoing', 'Completed', 'Upcoming'];

  const projects = [
    {
      id: 1,
      title: 'Concrete Road Construction',
      location: 'Ward No. 5',
      image: 'https://images.unsplash.com/photo-1541888031-6453995166ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Ongoing',
      progress: 70,
      budget: '₹45 Lakhs'
    },
    {
      id: 2,
      title: 'Drainage Line Work',
      location: 'Ward No. 3',
      image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Ongoing',
      progress: 50,
      budget: '₹25 Lakhs'
    },
    {
      id: 3,
      title: 'Water Supply Pipeline',
      location: 'Ward No. 7',
      image: 'https://images.unsplash.com/photo-1588667500588-f3d1bcf23270?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Ongoing',
      progress: 60,
      budget: '₹80 Lakhs'
    },
    {
      id: 4,
      title: 'Street Light Installation',
      location: 'Ward No. 9',
      image: 'https://images.unsplash.com/photo-1555529733-0e67056058e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Completed',
      progress: 100,
      budget: '₹15 Lakhs'
    },
    {
      id: 5,
      title: 'Public Park Development',
      location: 'Ward No. 2',
      image: 'https://images.unsplash.com/photo-1577717903565-df457c1bc945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Upcoming',
      progress: 0,
      budget: '₹30 Lakhs'
    },
    {
      id: 6,
      title: 'Primary Health Center Renovation',
      location: 'Ward No. 12',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Completed',
      progress: 100,
      budget: '₹55 Lakhs'
    }
  ];

  const filteredProjects = filter === 'All Works' 
    ? projects 
    : projects.filter(p => p.status === filter);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Development Works</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">Track the progress of various infrastructure and development projects initiated by the Godhani Nagar Panchayat.</p>
          
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {project.status}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 h-12">{project.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                     <MapPin className="w-4 h-4 mr-1 shrink-0" />
                     {project.location}
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs text-gray-500 font-medium">Progress</span>
                      <span className="text-sm font-bold text-gray-800">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-2 rounded-full ${
                          project.progress === 100 ? 'bg-green-500' :
                          project.progress > 0 ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      />
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500 font-medium">Estimated Budget: </span>
                      <span className="font-semibold text-gray-900">{project.budget}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length > 0 && (
          <div className="mt-12 text-center">
            <button className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium transition-colors">
              View All Projects
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
