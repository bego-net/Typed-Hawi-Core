import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPartners, type Partner } from '../services/api';

const DEFAULT_LOGO = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="%23e2e8f0"%3E%3Ccircle cx="50" cy="50" r="50"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%2394a3b8"%3ELogo%3C/text%3E%3C/svg%3E';

function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    getPartners()
      .then((data) => setPartners(data))
      .catch(() => console.error('Failed to load partners'))
      .finally(() => setLoading(false));
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % partners.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length);

  if (loading || partners.length === 0) return null;

  return (
    <section className="relative bg-white dark:bg-[#050505] py-24 transition-colors duration-500 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500 mb-16">
          Global Strategic Partners
        </h2>

        <div className="relative flex items-center justify-center min-h-[220px]">
          {/* Navigation Arrows */}
          {partners.length > 3 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 z-20 p-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-90"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 z-20 p-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-90"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          {/* Logo Stage */}
          <div className="flex items-center gap-6 sm:gap-12 lg:gap-16">
            <AnimatePresence mode="popLayout" initial={false}>
              {[...Array(5)].map((_, i) => {
                const index = (currentIndex + i - 2 + partners.length) % partners.length;
                const partner = partners[index];
                if (!partner) return null;
                
                const isCenter = i === 2;
                const isSelected = selectedId === partner.id;

                return (
                  <motion.div
                    key={`${partner.id}-${i}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: isCenter ? 1 : 0.5, 
                      scale: isCenter ? (isSelected ? 1.4 : 1.2) : 0.9,
                      zIndex: isCenter ? 10 : 0
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSelectedId(isSelected ? null : partner.id)}
                    className="relative cursor-pointer transition-all duration-500"
                  >
                    {/* --- THE FIX: Circular Crop Container --- */}
                    <div className={`
                      relative overflow-hidden rounded-full 
                      w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28
                      bg-slate-50 dark:bg-white/5 
                      border-2 transition-all duration-500
                      ${isCenter 
                        ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.3)]' 
                        : 'border-slate-200 dark:border-white/10'}
                    `}>
                      <img
                        src={partner.logo || DEFAULT_LOGO}
                        alt={partner.name}
                        /* 'object-cover' ensures the image fills the circle 
                           'w-full h-full' ensures the image occupies the whole circle area
                        */
                        className="w-full h-full object-cover transition-all duration-500 dark:brightness-110"
                        onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_LOGO }}
                      />
                    </div>
                    
                    {/* Active Indicator */}
                    {isCenter && (
                      <motion.div 
                        layoutId="underline"
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-1 bg-red-600 rounded-full"
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Selected Partner Name */}
        <div className="mt-16 h-6 text-center">
          <AnimatePresence mode="wait">
            <motion.p 
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]"
            >
              {partners[currentIndex]?.name}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Partners;