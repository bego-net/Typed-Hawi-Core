import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function AboutPreview() {
  return (
    <section id="about-preview" className="relative bg-white dark:bg-[#050505] py-24 lg:py-32 overflow-hidden transition-colors duration-500">
      {/* --- BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-500/5 dark:bg-red-900/10 rounded-full blur-[120px] opacity-50 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-200/50 dark:bg-slate-900/20 rounded-full blur-[100px] transition-colors duration-500" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT — TECHNICAL VISUAL STAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* The Bento-Box Container */}
            <div className="relative rounded-[2.5rem] p-1 bg-gradient-to-b from-slate-100 to-white dark:from-white/10 dark:to-transparent shadow-xl dark:shadow-2xl transition-colors duration-500">
              <div className="relative rounded-[2.4rem] overflow-hidden bg-slate-50 dark:bg-[#0A0A0A] p-8 md:p-12 border border-slate-200 dark:border-white/5 transition-colors duration-500">
                
                {/* Visual Content: Technical Grid */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/40 dark:bg-red-600/40" />
                      <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-800" />
                    </div>
                    <div className="px-3 py-1 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] text-slate-500 font-mono shadow-sm dark:shadow-none transition-colors duration-500">
                      v2.0.26_production
                    </div>
                  </div>

                  {/* Abstract UI Elements */}
                  <div className="space-y-4 pt-4">
                    <div className="h-[1px] w-full bg-gradient-to-r from-rose-500/30 dark:from-red-600/50 to-transparent" />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-20 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm dark:shadow-none flex flex-col items-center justify-center transition-colors duration-500">
                         <div className="h-2 w-10 bg-rose-500/20 dark:bg-red-600/20 rounded-full mb-2" />
                         <div className="h-1 w-6 bg-slate-300 dark:bg-slate-700 rounded-full" />
                      </div>
                      <div className="h-20 rounded-2xl bg-rose-50 dark:bg-red-600/10 border border-rose-100 dark:border-red-500/10 flex flex-col items-center justify-center transition-colors duration-500">
                         <div className="h-2 w-10 bg-rose-500/40 dark:bg-red-600/40 rounded-full mb-2" />
                         <div className="h-1 w-6 bg-rose-300/50 dark:bg-red-400/30 rounded-full" />
                      </div>
                      <div className="h-20 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm dark:shadow-none flex flex-col items-center justify-center transition-colors duration-500">
                         <div className="h-2 w-10 bg-slate-300 dark:bg-slate-700 rounded-full mb-2" />
                         <div className="h-1 w-6 bg-slate-200 dark:bg-slate-800 rounded-full" />
                      </div>
                    </div>
                    <div className="h-[1px] w-full bg-gradient-to-l from-rose-500/30 dark:from-red-600/50 to-transparent" />
                  </div>
                </div>

                {/* Floating Status Card */}
                <motion.div
                  className="absolute bottom-8 right-8 rounded-2xl bg-white/90 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-5 shadow-xl dark:shadow-2xl transition-colors duration-500"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-black text-slate-900 dark:text-white leading-none">10<span className="text-rose-600 dark:text-red-600">+</span></div>
                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10" />
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold leading-tight">
                      Years of <br /> Engineering
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-rose-600 dark:bg-red-600" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600 dark:text-red-500">
                  Our Identity
                </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-8 transition-colors duration-500">
              Scalable Software <br />
              <span className="text-slate-500 italic">Built for the </span> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-rose-600 dark:from-white dark:to-red-500">Modern Era</span>
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 transition-colors duration-500">
              Hawi Software Solutions bridges the gap between complex business logic and intuitive 
              user experiences. We don't just write code; we architect digital growth 
              through robust engineering and forward-thinking design.
            </p>

            {/* Feature list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                'Enterprise-Grade Security',
                'Custom API Architecture',
                'Performance Optimization',
                'Seamless Scalability',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-md bg-rose-50 dark:bg-red-600/10 border border-rose-200 dark:border-red-500/20 flex items-center justify-center group-hover:bg-rose-600 dark:group-hover:bg-red-600 transition-colors duration-300">
                    <svg className="w-3 h-3 text-rose-500 dark:text-red-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-500">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                to="/about"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-slate-900 dark:bg-white px-8 py-4 text-sm font-bold text-white dark:text-black transition-all hover:bg-rose-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20 dark:shadow-none"
              >
                Learn Our Process
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;