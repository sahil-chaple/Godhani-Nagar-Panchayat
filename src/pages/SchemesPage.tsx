import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function SchemesPage() {
  const schemes = [
    {
      title: 'PM Awas Yojana',
      description: 'Pradhan Mantri Awas Yojana (Urban & Rural) aims to provide affordable housing for all.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bg: 'bg-orange-50'
    },
    {
      title: 'Jal Jeevan Mission',
      description: 'Har Ghar Jal - Ensuring safe and adequate drinking water through individual household tap connections.',
      image: 'https://images.unsplash.com/photo-1548811776-90c1f516d00e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bg: 'bg-blue-50'
    },
    {
      title: 'Swachh Bharat Mission',
      description: 'Clean India, Green India. A nationwide campaign to clean up the streets, roads and infrastructure.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bg: 'bg-green-50'
    },
    {
      title: 'PM Kisan Samman Nidhi',
      description: 'Financial support of ₹6000 per year to eligible farmer families across the country.',
      image: 'https://images.unsplash.com/photo-1595804473049-d7b438289467?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bg: 'bg-yellow-50'
    },
    {
      title: 'Mahatma Gandhi NREGA',
      description: 'Enhancing livelihood security by providing at least 100 days of guaranteed wage employment.',
      image: 'https://images.unsplash.com/photo-1507914099516-edcb205d1bb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bg: 'bg-emerald-50'
    },
    {
      title: 'PM Ujjwala Yojana',
      description: 'Providing clean cooking fuel to poor households, replacing traditional unhealthy fuels.',
      image: 'https://images.unsplash.com/photo-1563245450-424a1b021319?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      bg: 'bg-red-50'
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Government Schemes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore various state and central government initiatives, schemes, and programs available for the citizens of Godhani.</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {schemes.map((scheme, index) => (
            <motion.div
              key={scheme.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center ${scheme.bg}`}
            >
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500">
                <img 
                  src={scheme.image} 
                  alt={scheme.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{scheme.title}</h3>
              <p className="text-gray-600 text-sm mb-8 flex-grow">{scheme.description}</p>
              
              <button className="text-primary hover:text-primary-dark font-semibold text-sm flex items-center transition-colors">
                Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
