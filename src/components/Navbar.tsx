import { Link } from 'react-router-dom';
import { Menu, X, Search, Moon, Sun, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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

          <div className="hidden md:flex items-center space-x-4">
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

          <div className="flex items-center justify-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-green-50"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
