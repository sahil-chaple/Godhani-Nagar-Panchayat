import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search } from 'lucide-react';

export default function DownloadsPage() {
  const [filter, setFilter] = useState('Forms');
  const [search, setSearch] = useState('');

  const tabs = ['Forms', 'Acts & Rules', 'Reports', 'Others'];

  const documents = [
    { title: 'Property Tax Application Form', type: 'PDF', size: '240 KB', category: 'Forms' },
    { title: 'Birth Certificate Application Form', type: 'PDF', size: '180 KB', category: 'Forms' },
    { title: 'Trade License Application Form', type: 'PDF', size: '310 KB', category: 'Forms' },
    { title: 'Building Permission Form', type: 'PDF', size: '505 KB', category: 'Forms' },
    { title: 'Maharashtra Municipal Councils Act, 1965', type: 'PDF', size: '2.4 MB', category: 'Acts & Rules' },
    { title: 'Annual Budget Report 2024-25', type: 'PDF', size: '4.1 MB', category: 'Reports' },
    { title: 'Town Planning Development Control Rules', type: 'PDF', size: '1.8 MB', category: 'Acts & Rules' },
    { title: 'Swachh Survekshan Report 2024', type: 'PDF', size: '3.2 MB', category: 'Reports' },
  ];

  const filteredDocs = documents.filter(doc => 
    doc.category === filter && 
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Downloads</h1>
          <p className="text-gray-600">Download official application forms, acts, rules, and reports.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    filter === tab 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-gray-50 text-gray-600 hover:bg-green-50 border border-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-64 shrink-0">
              <input 
                type="text" 
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-4">
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc, index) => (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-green-50/30 transition-all group gap-4"
                >
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{doc.title}</h4>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <span className="font-medium text-gray-700 mr-2">{doc.type}</span> 
                        {doc.size}
                      </p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors flex items-center justify-center text-sm shadow-sm shrink-0">
                    Download
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>No documents found matching your search.</p>
              </div>
            )}
          </div>
          
          {filteredDocs.length > 0 && (
             <div className="mt-8 text-center pt-6 border-t border-gray-100">
                <button className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
                   View All Downloads
                </button>
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
