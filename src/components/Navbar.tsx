import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { removeToken, isAdminLoggedIn } from '../auth/token';
import api from '../api/axios';
import type { Service } from '../types/service';
import logoImg from '../assets/logo.png';
import { useTheme } from '../context/ThemeContext';

type ApiResponse = {
  success: boolean;
  data: Service[];
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const isAdmin = isAdminLoggedIn();
  const { theme, toggleTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get<ApiResponse>('/services');
        setServices(res.data.data);
      } catch {
        // Silently fail
      }
    };
    void fetchServices();
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Framer Motion variants
  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, y: "-100%", transition: { duration: 0.4 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-1 py-2 text-[15px] font-medium transition-colors duration-300 group ${
      isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
    }`;

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm border-b border-slate-200 dark:border-slate-800 py-2'
            : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/50 py-3'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          
          {/* LEFT - LOGO & NAME */}
          <NavLink to="/" className="flex items-center gap-3 group z-50" onClick={() => setIsMenuOpen(false)}>
            <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 transition-all duration-500 group-hover:scale-105 group-hover:shadow-sm">
              <img 
                src={logoImg} 
                alt="Hawi Logo" 
                className="h-8 sm:h-9 w-auto object-contain" 
              />
            </div>
            <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300 whitespace-nowrap">
              Hawi Software Solution
            </span>
          </NavLink>

          {/* RIGHT - DESKTOP NAV */}
          <nav className="hidden items-center gap-8 lg:flex">
            <div className="flex items-center gap-8">
              <NavLink to="/" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    Home
                    <span className={`absolute left-0 right-0 bottom-0 h-[2px] bg-slate-900 dark:bg-white transition-transform origin-left duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </>
                )}
              </NavLink>
              
              <NavLink to="/about" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    About
                    <span className={`absolute left-0 right-0 bottom-0 h-[2px] bg-slate-900 dark:bg-white transition-transform origin-left duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </>
                )}
              </NavLink>

              {/* SERVICES DROPDOWN */}
              <div 
                className="relative py-2" 
                onMouseEnter={() => setIsServicesOpen(true)} 
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button 
                  type="button" 
                  onClick={() => navigate('/services')} 
                  className={`flex items-center gap-1.5 px-1 text-[15px] font-medium transition-colors ${isServicesOpen ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Services
                  <svg className={`h-4 w-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-slate-900 dark:text-white' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Panel */}
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-800 p-2 shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-700"
                    >
                      <div className="space-y-1">
                        {services.length === 0 ? (
                          <div className="px-4 py-6 flex justify-center">
                            <div className="w-5 h-5 border-2 border-slate-900 dark:border-white border-t-transparent rounded-full animate-spin" />
                          </div>
                        ) : (
                          services.map((service) => (
                            <Link 
                              key={service.id} 
                              to={`/services/${service.slug}`} 
                              className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white hover:pl-5" 
                              onClick={() => setIsServicesOpen(false)}
                            >
                              {service.title}
                            </Link>
                          ))
                        )}
                      </div>
                      <div className="mx-3 my-2 border-t border-slate-100 dark:border-slate-700" />
                      <Link 
                        to="/services" 
                        className="block rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50" 
                        onClick={() => setIsServicesOpen(false)}
                      >
                        Explore all services &rarr;
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/contact" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    Contact
                    <span className={`absolute left-0 right-0 bottom-0 h-[2px] bg-slate-900 dark:bg-white transition-transform origin-left duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </>
                )}
              </NavLink>

              {/* ADMIN */}
              {isAdmin && (
                <>
                  <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
                  <NavLink to="/admin/services" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    Admin
                  </NavLink>
                  <button 
                    type="button" 
                    onClick={() => { removeToken(); window.location.reload(); }} 
                    className="text-[15px] font-medium text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* THEME TOGGLE */}
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>
          </nav>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex items-center gap-4 lg:hidden z-50">
            {/* MOBILE THEME TOGGLE */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="group relative p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between overflow-hidden">
                <span className={`w-full h-[2px] bg-slate-900 dark:bg-white rounded-full transform transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-45 translate-x-px' : ''}`} />
                <span className={`w-full h-[2px] bg-slate-900 dark:bg-white rounded-full transform transition-all duration-300 ${isMenuOpen ? 'opacity-0 translate-x-5' : ''}`} />
                <span className={`w-full h-[2px] bg-slate-900 dark:bg-white rounded-full transform transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-45 translate-x-px' : ''}`} />
              </div>
            </button>
          </div>

        </div>
      </motion.header>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 flex flex-col bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex-1 overflow-y-auto px-6 pb-24 pt-32">
              <div className="flex flex-col gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <NavLink to="/" className="text-2xl font-bold text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <NavLink to="/about" className="text-2xl font-bold text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors" onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <button 
                    type="button" 
                    className="flex w-full items-center justify-between text-2xl font-bold text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                  >
                    Services
                    <svg className={`h-6 w-6 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-4 pl-4 border-l-2 border-slate-200 dark:border-slate-700 flex flex-col gap-4"
                      >
                        {services.map((service) => (
                          <Link 
                            key={service.id} 
                            to={`/services/${service.slug}`} 
                            className="text-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors" 
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {service.title}
                          </Link>
                        ))}
                        <Link 
                          to="/services" 
                          className="text-lg font-semibold text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors mt-2" 
                          onClick={() => setIsMenuOpen(false)}
                        >
                          View All Services &rarr;
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <NavLink to="/contact" className="text-2xl font-bold text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                </motion.div>

                {isAdmin && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="mt-4 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-6">
                    <NavLink to="/admin/services" className="text-xl font-bold text-slate-500 dark:text-slate-400" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</NavLink>
                    <button type="button" onClick={() => { removeToken(); window.location.reload(); }} className="text-left text-xl font-bold text-rose-500">Logout</button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;