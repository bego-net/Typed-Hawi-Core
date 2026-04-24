import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const stats = [
  { id: 1, name: 'Years of Experience', value: 10, suffix: '+', icon: '🏆' },
  { id: 2, name: 'Reliable Support', value: 24, suffix: '/7', icon: '⚡' },
  { id: 3, name: 'Tailored Solutions', value: 100, suffix: '%', icon: '🎯' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  
  // Use Spring for high-performance, smooth counter physics
  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

function Stats() {
  return (
    <section className="relative bg-white dark:bg-[#050505] py-16 px-6 transition-colors duration-500">
      <div className="mx-auto max-w-5xl">
        {/* The "Bento Strip" - Minimal height, maximum impact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl lg:rounded-full bg-slate-50 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-sm transition-colors duration-500"
        >
          {/* Subtle inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-white/5 to-transparent pointer-events-none transition-colors duration-500" />

          <div className="relative grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-white/10 transition-colors duration-500">
            {stats.map((stat) => (
              <div 
                key={stat.id} 
                className="group flex items-center justify-between md:justify-center gap-6 px-8 py-8 lg:py-10 transition-colors hover:bg-white/50 dark:hover:bg-white/5 duration-500"
              >
                {/* Icon Circle */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-white/5 text-2xl border border-slate-100 dark:border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-none">
                  {stat.icon}
                </div>

                <div className="flex flex-col text-right md:text-left">
                  <dd className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none transition-colors duration-500">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mt-2 transition-colors duration-500">
                    {stat.name}
                  </dt>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Minimal shadow for better flow */}
        <div className="mx-auto w-[60%] h-2 bg-slate-900/5 dark:bg-black/20 blur-xl rounded-[100%] mt-4 opacity-50" />
      </div>
    </section>
  );
}

export default Stats;