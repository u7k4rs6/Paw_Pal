import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { PawPrint as Paw, Menu, X, User } from 'lucide-react';
import { usePetContext } from '../../context/PetContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser } = usePetContext();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Paw 
              size={32} 
              className="text-primary-600" 
              strokeWidth={2.5} 
            />
            <span className={`text-xl font-bold ${isScrolled ? 'text-primary-900' : 'text-white'}`}>PawPal</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium transition-colors ${
                  isActive 
                    ? 'text-primary-600' 
                    : isScrolled 
                      ? 'text-gray-700 hover:text-primary-600' 
                      : 'text-white hover:text-primary-100'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/breed-explorer" 
              className={({ isActive }) => 
                `font-medium transition-colors ${
                  isActive 
                    ? 'text-primary-600' 
                    : isScrolled 
                      ? 'text-gray-700 hover:text-primary-600' 
                      : 'text-white hover:text-primary-100'
                }`
              }
            >
              Breed Explorer
            </NavLink>
            <NavLink 
              to="/adoption-matcher" 
              className={({ isActive }) => 
                `font-medium transition-colors ${
                  isActive 
                    ? 'text-primary-600' 
                    : isScrolled 
                      ? 'text-gray-700 hover:text-primary-600' 
                      : 'text-white hover:text-primary-100'
                }`
              }
            >
              Adoption Matcher
            </NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary-300"
                />
                <span className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                  {currentUser.name}
                </span>
              </div>
            ) : (
              <button className="btn-primary flex items-center">
                <User size={18} className="mr-2" />
                Login
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? (
                <X size={24} className="text-primary-600" />
              ) : (
                <Menu size={24} className={isScrolled ? 'text-gray-700' : 'text-white'} />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/breed-explorer"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                Breed Explorer
              </NavLink>
              <NavLink
                to="/adoption-matcher"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                Adoption Matcher
              </NavLink>
              
              {currentUser ? (
                <div className="flex items-center space-x-2 px-4 py-2">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary-300"
                  />
                  <span className="font-medium text-gray-800">
                    {currentUser.name}
                  </span>
                </div>
              ) : (
                <button className="btn-primary mx-4 flex items-center justify-center">
                  <User size={18} className="mr-2" />
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;