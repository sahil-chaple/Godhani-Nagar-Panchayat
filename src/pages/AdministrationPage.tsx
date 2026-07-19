import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, UserCircle } from 'lucide-react';

export default function AdministrationPage() {
  const [activeTab, setActiveTab] = useState('President');

  const tabs = ['President', 'Vice President', 'Chief Officer', 'Councillors', 'Departments'];

  const profiles = {
    'President': {
      name: 'Mr. Nitin Ganvir',
      designation: 'President',
      body: 'Godhani Nagar Panchayat',
      message: 'It gives me immense pleasure to welcome you to the official website of Godhani Nagar Panchayat. Our vision is to provide transparent, citizen-friendly services and ensure overall development of Godhani. We are committed to making our town clean, green, and technologically advanced.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    'Vice President': {
      name: 'Mrs. Sunita Shirke',
      designation: 'Vice President',
      body: 'Godhani Nagar Panchayat',
      message: 'Welcoming you all to our digital initiative. Our focus remains on robust infrastructure, women empowerment, and efficient public services for all citizens of Godhani.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    }
  };

  const activeProfile = profiles[activeTab as keyof typeof profiles];

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Administration</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Meet the dedicated leaders and officials working towards the progress and prosperity of Godhani.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {activeProfile ? (
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 bg-gray-50 p-8 flex flex-col items-center justify-center border-r border-gray-100">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                  <img src={activeProfile.image} alt={activeProfile.name} className="w-full h-full object-cover object-top" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 text-center">{activeProfile.name}</h2>
                <div className="text-primary font-semibold mt-1">{activeProfile.designation}</div>
                <div className="text-sm text-gray-500 mt-1">{activeProfile.body}</div>
              </div>
              
              <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                <UserCircle className="w-12 h-12 text-gray-200 mb-6" />
                <p className="text-gray-600 text-lg leading-relaxed italic mb-8">
                  "{activeProfile.message}"
                </p>
                <div>
                  <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors inline-flex items-center">
                    View Complete Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="p-16 text-center text-gray-500">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">Content in Development</h3>
              <p>Details for {activeTab} are being updated and will be available soon.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
