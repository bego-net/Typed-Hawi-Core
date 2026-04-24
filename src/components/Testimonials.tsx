import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTestimonials, type Testimonial } from '../services/api';

const DEFAULT_AVATAR = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="%23e2e8f0"%3E%3Ccircle cx="50" cy="50" r="50"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%2394a3b8"%3E%3F%3C/text%3E%3C/svg%3E';

function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTestimonials()
      .then((d) => setTestimonials(d.slice(0, 6)))
      .catch(() => setError('Failed to load testimonials'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="testimonials" className="relative bg-white dark:bg-[#050505] py-24 transition-colors duration-500 overflow-hidden">
      
      {/* --- Aesthetic Ambient Glows --- */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* --- Centered Header Section --- */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-red-600 dark:text-red-500 font-mono text-xs font-bold tracking-[0.4em] uppercase block mb-4"
          >
            // Voice of the People
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white sm:text-6xl leading-[1.1]"
          >
            Trusted by businesses <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">everywhere.</span>
          </motion.h2>
        </div>

        {loading && (
          <div className="flex justify-center items-center gap-4 py-20">
             <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
             <span className="text-slate-400 font-medium tracking-widest text-xs uppercase">Loading Experiences</span>
          </div>
        )}
        
        {error && <p className="text-center text-red-500 font-mono">{error}</p>}

        {!loading && !error && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="break-inside-avoid group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-900 rounded-[2rem] opacity-0 group-hover:opacity-10 transition duration-500 blur-lg" />
                  
                  <div className="relative p-8 rounded-[1.8rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#0a0a0a] hover:bg-white dark:hover:bg-[#0f0f0f] transition-all duration-300">
                    
                    <div className="flex justify-between items-start mb-6">
                       <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                       </div>
                       <svg className="w-8 h-8 text-slate-200 dark:text-white/5 group-hover:text-red-600/20 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                       </svg>
                    </div>

                    <blockquote className="text-slate-700 dark:text-slate-300 text-base leading-relaxed font-medium">
                      "{t.message}"
                    </blockquote>

                    <div className="mt-8 flex items-center gap-4 border-t border-slate-200/50 dark:border-white/5 pt-6">
                      <div className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-red-600/20 shadow-lg shadow-red-900/10">
                        <img 
                          src={t.image || DEFAULT_AVATAR} 
                          alt={t.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_AVATAR }}
                        />
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 dark:text-white tracking-wide">
                          {t.name}
                        </span>
                        <span className="text-[10px] font-bold text-red-600 dark:text-red-500 uppercase tracking-widest">
                          {t.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;