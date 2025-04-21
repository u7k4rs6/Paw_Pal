import { PawPrint as Paw, Facebook, Twitter, Instagram, Youtube, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Paw size={28} className="text-primary-400" />
              <span className="text-xl font-bold">PawPal</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate pet companion hub for breed information, adoption matching, and connecting with other pet lovers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/breed-explorer" className="text-gray-400 hover:text-white transition-colors">
                  Breed Explorer
                </Link>
              </li>
              <li>
                <Link to="/adoption-matcher" className="text-gray-400 hover:text-white transition-colors">
                  Adoption Matcher
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Pet Care Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Breed Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Adoption Process
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Training Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Pet Health
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-start text-gray-400">
                <Mail size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>support@pawpal.com</span>
              </p>
              <a href="#" className="btn-primary inline-block">
                Send Us a Message
              </a>
              <p className="text-gray-400 mt-4">
                Subscribe to our newsletter for pet care tips and updates.
              </p>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500 w-full"
                />
                <button className="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PawPal. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-6">
          <p className="flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> for pet lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;