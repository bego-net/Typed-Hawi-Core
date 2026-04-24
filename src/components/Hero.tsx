import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImg from '../assets/logo.png';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center bg-white dark:bg-[#050505] overflow-hidden pt-32 pb-20 transition-colors duration-500">
      {/* --- BACKGROUND ACCENTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-500/5 dark:bg-rose-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-slate-100 dark:bg-slate-900/20 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* --- LEFT: IMAGE (Visual Stage) --- */}
        <motion.div 
          className="relative order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative group">
            {/* Soft Glow behind image */}
            <div className="absolute inset-0 bg-rose-500/10 dark:bg-rose-600/20 blur-[80px] rounded-full scale-90 group-hover:scale-100 transition-transform duration-700" />
            
            {/* Main Image Container */}
            <motion.div 
              className="relative z-10 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-2xl border border-slate-100 dark:border-white/5"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src={heroImg} 
                alt="Hawi Software Solution Logo" 
                className="w-full h-auto object-contain max-h-[350px] drop-shadow-xl" 
              />
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl animate-pulse" />
          </div>
        </motion.div>

        {/* --- RIGHT: CONTENT --- */}
        <motion.div 
          className="text-center lg:text-left order-1 lg:order-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800/50 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Innovating Future Solutions</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            <span className="block text-slate-900 dark:text-white">Empowering Your</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-slate-900 dark:to-rose-400">
              Hawi Software Solution
            </span>
          </h1>

          <p className="max-w-xl text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed mb-10 mx-auto lg:mx-0">
            We bridge the gap between complex logic and intuitive design. 
            Architecting the future of digital ecosystems with precision engineering.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
            <Link 
              to="/contact" 
              className="px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-600/20"
            >
              Start Project
            </Link>
            <Link 
              to="/services" 
              className="px-10 py-4 border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white rounded-full font-bold transition-all"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;