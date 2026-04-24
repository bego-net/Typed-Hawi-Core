import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function AboutPreview() {
  return (
    <section id="about-preview" className="relative bg-slate-50 dark:bg-[#050505] py-24 lg:py-32 overflow-hidden transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-rose-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT — VISUAL STAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[3rem] p-4 bg-white dark:bg-slate-900 shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-slate-100 dark:border-white/5">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 p-8 flex flex-col gap-6">
                {/* Mock UI Elements */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-12 h-3 bg-rose-500/20 rounded-full" />
                    <div className="w-8 h-3 bg-slate-300 dark:bg-slate-700 rounded-full" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10" />
                </div>
                
                <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/5 p-6 shadow-sm">
                  <div className="space-y-4">
                    <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded-lg" />
                    <div className="h-4 w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg" />
                    <div className="h-4 w-3/4 bg-slate-50 dark:bg-slate-800/50 rounded-lg" />
                    <div className="pt-4 grid grid-cols-2 gap-4">
                      <div className="h-16 rounded-xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800/50" />
                      <div className="h-16 rounded-xl bg-slate-50 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>

                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl opacity-50" />
              </div>

              {/* Floating Stat Card */}
              <motion.div
                className="absolute -bottom-6 -right-6 rounded-3xl bg-rose-600 p-8 text-white shadow-2xl"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-4xl font-black mb-1">10+</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-80 leading-tight">
                  Years of <br /> Engineering
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-rose-600 dark:text-rose-400 font-bold uppercase tracking-widest text-xs">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 mb-8 leading-tight">
              We Architect <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-slate-900 dark:to-rose-400">Digital Growth.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
              Hawi Software Solutions bridges the gap between complex business logic and intuitive 
              user experiences. We don't just write code; we build the foundations for your digital future.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                { title: 'Security', desc: 'Enterprise-grade protection.' },
                { title: 'Scalability', desc: 'Built to grow with you.' },
                { title: 'Performance', desc: 'Fast and reliable code.' },
                { title: 'Design', desc: 'Intuitive user experiences.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/10 flex items-center justify-center text-rose-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-3 rounded-full bg-rose-600 px-10 py-4 text-sm font-bold text-white transition-all hover:bg-rose-700 hover:scale-105 active:scale-95 shadow-lg shadow-rose-600/20"
            >
              Learn Our Process
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;