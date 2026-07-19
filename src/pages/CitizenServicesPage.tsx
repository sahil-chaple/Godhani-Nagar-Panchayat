import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Baby, FileX, Building, Droplets, Briefcase, Home, AlertCircle, FileText } from 'lucide-react';

export default function CitizenServicesPage() {
  const services = [
    { title: 'Birth Certificate', action: 'Apply Now', icon: Baby, path: '/services/birth-certificate', color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Death Certificate', action: 'Apply Now', icon: FileX, path: '/services/death-certificate', color: 'text-gray-500', bg: 'bg-gray-50' },
    { title: 'Property Tax', action: 'Pay Now', icon: Building, path: '/services/property-tax', color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Water Tax', action: 'Pay Now', icon: Droplets, path: '/services/water-tax', color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { title: 'Trade License', action: 'Apply Now', icon: Briefcase, path: '/services/trade-license', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'Building Permission', action: 'Apply Now', icon: Home, path: '/services/building-permission', color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Complaint', action: 'Lodge Now', icon: AlertCircle, path: '/services/complaint', color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Online Forms', action: 'View All', icon: FileText, path: '/downloads', color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Online Services for Citizens</h1>
          <p className="text-gray-600">Access essential civic services from the comfort of your home.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  to={service.path}
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group h-full"
                >
                  <div className={`w-20 h-20 rounded-full ${service.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-10 h-10 ${service.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex-grow">{service.title}</h3>
                  <span className="inline-block px-6 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 group-hover:bg-[#1B5E20] group-hover:text-white group-hover:border-[#1B5E20] transition-colors w-full">
                    {service.action}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
