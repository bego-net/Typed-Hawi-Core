import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Custom Software Development',
    description:
      'Develop reliable software solutions tailored to your unique business workflows and daily operations.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    gradient: 'from-rose-500 to-rose-700',
    glowColor: 'rgba(225,29,72,0.15)',
  },
  {
    title: 'Web Design & Development',
    description:
      'Design and build polished websites and digital platforms that balance strong performance with clean UX.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    gradient: 'from-rose-400 to-rose-600',
    glowColor: 'rgba(225,29,72,0.15)',
  },
  {
    title: 'Mobile App Development',
    description:
      "Create mobile-first applications that bring services, communication, and productivity into users' hands.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    gradient: 'from-red-500 to-rose-600',
    glowColor: 'rgba(225,29,72,0.15)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

function ServicesPreview() {
  return (
    <section id="services-preview" className="relative bg-slate-50 dark:bg-[#050505] py-24 sm:py-32 overflow-hidden transition-colors duration-500">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] text-slate-900 dark:text-white transition-opacity duration-500"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center rounded-full bg-rose-50 dark:bg-rose-900/10 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-rose-600 dark:text-rose-400 ring-1 ring-rose-100 dark:ring-rose-800/50 transition-colors duration-500">
            Services
          </span>
          <p className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl transition-colors duration-500">
            Everything you need to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-slate-900 dark:to-white">grow digitally</span>
          </p>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 leading-relaxed transition-colors duration-500">
            From concept to launch, we deliver end-to-end solutions that drive real results.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative flex flex-col rounded-2xl bg-white dark:bg-[#0A0A0A] p-8 shadow-sm dark:shadow-none ring-1 ring-slate-200/60 dark:ring-white/5 hover:shadow-2xl dark:hover:shadow-rose-900/10 hover:-translate-y-2 transition-all duration-500"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `0 20px 60px ${service.glowColor}` }}
                />

                {/* Icon */}
                <div
                  className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-500`}
                >
                  {service.icon}
                </div>

                <h3 className="relative text-xl font-bold leading-7 text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="relative mt-4 flex-auto text-base leading-7 text-slate-500 dark:text-slate-400 transition-colors duration-500">
                  {service.description}
                </p>
                <div className="relative mt-6">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-500 dark:hover:text-rose-300 transition-colors group/link"
                  >
                    Learn More
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesPreview;
