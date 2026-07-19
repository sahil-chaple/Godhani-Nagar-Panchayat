import { Link } from 'react-router-dom';
import { Search, Moon, Sun, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Administration', path: '/administration' },
    { name: 'Citizen Services', path: '/services' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Development', path: '/development' },
    { name: 'Schemes', path: '/schemes' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-3">
            <img src="/logo.svg" alt="Godhani Nagar Panchayat" className="h-12 w-12 object-contain" onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/1B5E20/white?text=GNP'; }} />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-primary leading-tight">Godhani Nagar</span>
              <span className="text-secondary text-sm font-medium">Panchayat</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-primary font-medium text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-3 border-l pl-4 ml-4">
              <button className="text-gray-500 hover:text-primary">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-gray-500 hover:text-primary" onClick={() => setIsDark(!isDark)}>
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="flex items-center text-sm font-medium text-gray-500 cursor-pointer hover:text-primary">
                <Globe className="w-4 h-4 mr-1" /> EN
              </div>
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
}
