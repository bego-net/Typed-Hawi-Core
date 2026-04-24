import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, type Product } from '../services/api';

const DEFAULT_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" fill="%23cbd5e1"%3E%3Crect width="400" height="225" rx="8"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%2394a3b8"%3ENo Image%3C/text%3E%3C/svg%3E';

// Animation variants
const stagger = { 
  visible: { transition: { staggerChildren: 0.1 } } 
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

function ProductsPreview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // We fetch EVERYTHING here so the data is ready in the background
    getProducts()
      .then((d) => setProducts(d))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  // Logical toggle: show 3 or show all
  const displayedProducts = showAll ? products : products.slice(0, 3);

  return (
    <section id="products" className="relative bg-slate-50 dark:bg-[#050505] py-24 transition-colors duration-500 overflow-hidden">
      {/* Background Aesthetic */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 dark:bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* --- Centered Header --- */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red-600 dark:text-red-500 font-mono text-xs font-bold tracking-[0.4em] uppercase block mb-4"
          >
            // Strategic Assets
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white sm:text-6xl leading-tight"
          >
            Platforms ready for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">Scale.</span>
          </motion.h2>
        </div>

        {loading && (
          <div className="flex justify-center items-center gap-4 py-20">
             <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
             <span className="text-slate-400 font-medium tracking-widest text-xs uppercase font-mono">Syncing_Inventory...</span>
          </div>
        )}
        
        {error && <p className="text-center text-red-500 font-mono italic">{error}</p>}

        {!loading && !error && (
          <div className="flex flex-col items-center">
            {/* Products Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <AnimatePresence mode="popLayout">
                {displayedProducts.map((p) => (
                  <motion.article 
                    key={p.id} 
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="group flex flex-col rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200/60 dark:border-white/5 overflow-hidden hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <img 
                        src={p.image || DEFAULT_IMAGE} 
                        alt={p.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE }} 
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-8">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">{p.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
                        {p.description}
                      </p>
                      
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* --- Centered View More / Less Button --- */}
            {products.length > 3 && (
              <motion.div 
                layout
                className="mt-20 relative z-10"
              >
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="group relative flex items-center gap-4 px-10 py-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95 shadow-xl overflow-hidden"
                >
                  {/* Red Hover Effect */}
                  <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  
                  <span className="relative z-10">
                    {showAll ? 'View Fewer Products' : `View All Products (${products.length})`}
                  </span>

                  <motion.svg 
                    animate={{ rotate: showAll ? 180 : 0 }}
                    className="relative z-10 w-4 h-4 transition-transform" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductsPreview;