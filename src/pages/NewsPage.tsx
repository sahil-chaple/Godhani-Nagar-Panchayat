import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsPage() {
  const [filter, setFilter] = useState('All');

  const tabs = ['All', 'Notices', 'News', 'Tenders', 'Announcements'];

  const newsItems = [
    {
      id: 1,
      date: '21 MAY',
      title: 'Notice: Property Tax last date extended',
      description: 'The last date for property tax payment is extended to 31st May 2026 without any penalty interest.',
      category: 'Notices',
      year: '2026'
    },
    {
      id: 2,
      date: '19 MAY',
      title: 'Tender for Road Construction Work',
      description: 'Tender is invited for construction of cement concrete road in Ward No. 8. Last date for submission is 5th June.',
      category: 'Tenders',
      year: '2026'
    },
    {
      id: 3,
      date: '17 MAY',
      title: 'Water Supply Disruption',
      description: 'Water supply will remain closed on 18th May due to maintenance work at the primary water treatment plant.',
      category: 'Announcements',
      year: '2026'
    },
    {
      id: 4,
      date: '15 MAY',
      title: 'Nagar Panchayat Election Result',
      description: 'Declaration of result for Nagar Panchayat Election 2026. Oath taking ceremony scheduled for next week.',
      category: 'News',
      year: '2026'
    },
    {
      id: 5,
      date: '02 MAY',
      title: 'Special Gram Sabha Meeting',
      description: 'A special gram sabha will be held on 5th May to discuss pending development works in Ward No 3 & 4.',
      category: 'Notices',
      year: '2026'
    }
  ];

  const filteredNews = filter === 'All' ? newsItems : newsItems.filter(item => item.category === filter);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">News & Notices</h1>
          <p className="text-gray-600">Stay updated with the latest announcements, tenders, and official notices.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-wrap gap-2 p-6 border-b border-gray-100 bg-gray-50/50">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === tab 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-0">
            {filteredNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex flex-col sm:flex-row p-6 hover:bg-green-50/60 transition-colors group ${index !== filteredNews.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="sm:w-24 shrink-0 flex flex-col items-center sm:items-start mb-4 sm:mb-0">
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">{item.date.split(' ')[1]}</div>
                  <div className="text-3xl font-black text-primary">{item.date.split(' ')[0]}</div>
                </div>
                
                <div className="flex-1 sm:pl-6 sm:border-l border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
                    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold tracking-wider rounded-sm shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <button className="text-primary hover:text-primary-dark text-sm font-semibold transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-primary">
                    Read Full Status
                  </button>
                </div>
              </motion.div>
            ))}
            
            {filteredNews.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <p>No updating available in this category.</p>
              </div>
            )}
          </div>
          
          <div className="p-6 border-t border-gray-100 text-center bg-gray-50/50">
             <button className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
               View All
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
