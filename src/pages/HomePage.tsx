import { motion } from 'framer-motion';
import { ArrowRight, FileText, Droplets, AlertCircle, FileCheck, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCountUp } from '../hooks/useCountUp';

// Individual stat card uses the hook so each counter animates independently
function StatCard({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  const decimals = value % 1 !== 0 ? 2 : 0;
  const count = useCountUp(value, 2200, decimals);
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const stats: { label: string; value: number; suffix?: string }[] = [
    { label: 'Population', value: 9804 },
    { label: 'Wards', value: 17 },
    { label: 'Families', value: 2158 },
    { label: 'Literacy Rate', value: 90.78, suffix: '%' },
    { label: 'Male', value: 5039 },
    { label: 'Female', value: 4765 },
  ];

  const quickServices = [
    { name: 'Certificates', icon: FileCheck, path: '/services', color: 'text-green-700' },
    { name: 'Property Tax', icon: Building, path: '/services/property-tax', color: 'text-blue-700' },
    { name: 'Water Bill', icon: Droplets, path: '/services/water-tax', color: 'text-cyan-600' },
    { name: 'Complaint', icon: AlertCircle, path: '/services/complaint', color: 'text-red-600' },
    { name: 'Online Forms', icon: FileText, path: '/downloads', color: 'text-purple-600' },
  ];

  return (
    <div className="flex flex-col">
      {/* ─── Hero Section ─── */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-base md:text-lg font-medium mb-2 opacity-80 tracking-widest uppercase">
              Welcome to
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Godhani Nagar<br />Panchayat
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-85 max-w-2xl">
              Building a Clean, Green &amp; Digital Future — Together for a Developed Godhani.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/services"
                className="bg-[#1B5E20] hover:bg-[#144c18] text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Explore Services
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center"
              >
                Know More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="relative z-30 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 divide-x divide-gray-100"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </motion.div>
      </section>

      {/* ─── Quick Services Bar ─── */}
      <section className="bg-[#1B5E20] py-12 mt-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-semibold mb-8 opacity-90">
            Quick Online Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {quickServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  to={service.path}
                  className="flex flex-col items-center justify-center p-6 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-center border border-white/10 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <span className="font-semibold text-sm">{service.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
