import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
               <img src="https://placehold.co/100x100/1B5E20/white?text=GNP" alt="Logo" className="h-12 w-12 rounded-full bg-white p-1" />
               <div>
                  <h3 className="font-bold text-lg leading-tight">Godhani Nagar</h3>
                  <p className="text-gray-400 text-sm">Panchayat</p>
               </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Working towards a clean, green, and digital Godhani. Dedicated to citizen welfare and sustainable development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-gray-700 pb-2">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Citizen Services</Link></li>
              <li><Link to="/schemes" className="hover:text-accent transition-colors">Govt Schemes</Link></li>
              <li><Link to="/development" className="hover:text-accent transition-colors">Development Works</Link></li>
              <li><Link to="/downloads" className="hover:text-accent transition-colors">Downloads</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-gray-700 pb-2">Important Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-accent transition-colors">Digital India</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Incredible India</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Maharashtra Govt</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Swachh Bharat</a></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-6 border-b border-gray-700 pb-2">Contact Us</h4>
             <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                 <MapPin className="w-5 h-5 mr-3 text-accent shrink-0" />
                 <span>Godhani Nagar Panchayat Office, Tah. Nagpur Rural, Dist. Nagpur - 441123</span>
              </li>
              <li className="flex items-center">
                 <Phone className="w-5 h-5 mr-3 text-accent shrink-0" />
                 <span>07103-XXXXXX</span>
              </li>
              <li className="flex items-center">
                 <Mail className="w-5 h-5 mr-3 text-accent shrink-0" />
                 <span>contact@godhaninp.gov.in</span>
              </li>
             </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Godhani Nagar Panchayat. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-white">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
