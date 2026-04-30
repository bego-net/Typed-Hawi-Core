import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  HiOutlineLightBulb, HiOutlineEye,
  HiOutlineCodeBracket, HiOutlineDevicePhoneMobile, HiOutlineCpuChip 
} from 'react-icons/hi2'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
}

function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-200/40 via-white to-white dark:from-cyan-900/30 dark:via-[#050505] dark:to-[#050505]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex rounded-full bg-cyan-50 dark:bg-cyan-500/10 px-4 py-1.5 text-sm font-semibold leading-6 text-cyan-600 dark:text-cyan-400 ring-1 ring-inset ring-cyan-600/20 dark:ring-cyan-500/20 mb-8">
              Discover Who We Are
            </span>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-7xl mb-6">
              Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Future</span> of Digital
            </h1>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-400">
              We are a collective of visionary developers and designers building premium, scalable software solutions that drive real-world impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3 lg:max-w-none lg:grid-cols-3 rounded-3xl bg-slate-50 dark:bg-[#0a0a0a] border border-slate-100 dark:border-white/5 p-8 sm:p-12 shadow-sm"
          >
            {[
              { label: 'Projects Delivered', value: '150+' },
              { label: 'Global Clients', value: '45+' },
              { label: 'Years of Excellence', value: '5+' }
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="flex flex-col items-center text-center">
                <dt className="text-base leading-7 text-slate-600 dark:text-slate-400 mt-2">{stat.label}</dt>
                <dd className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white order-first">{stat.value}</dd>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 sm:py-32 border-t border-slate-100 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2 lg:items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Our Story
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                Founded with a vision to simplify complex digital challenges, Hawi Software Solutions
                has grown from a small startup into a reliable partner for organizations worldwide.
                We believe in the power of technology to transform operations and create meaningful
                user experiences.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                Our approach combines technical excellence with deep strategic thinking. Every line of
                code we write and every interface we design is focused on delivering real value and
                driving long-term success for our clients.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[16/9] lg:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 z-10" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                alt="Our team working"
                className="h-full w-full object-cover grayscale-[0.2] contrast-110"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Why Choose Us</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">We don't just write code; we engineer scalable success.</p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: HiOutlineCodeBracket, title: 'Clean Architecture', desc: 'Maintainable, scalable, and robust codebases built for the future.' },
              { icon: HiOutlineDevicePhoneMobile, title: 'Responsive Design', desc: 'Flawless user experiences across all devices and screen sizes.' },
              { icon: HiOutlineCpuChip, title: 'Modern Stack', desc: 'Leveraging the latest technologies for ultimate performance.' }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white dark:bg-[#111] border border-slate-100 dark:border-white/5 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <feature.icon className="h-10 w-10 text-cyan-600 dark:text-cyan-400 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {/* Mission Card */}
            <motion.div 
              variants={fadeIn}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-10 transition-all hover:shadow-2xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-400/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 mb-8">
                <HiOutlineLightBulb className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                To strengthen organizations by providing high-quality, custom digital solutions
                that are not only beautiful but also functional and scalable. We aim to be the
                catalyst for our clients' digital transformation.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              variants={fadeIn}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-10 transition-all hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 mb-8">
                <HiOutlineEye className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                To be a global leader in software innovation, recognized for our ability to turn
                complex ideas into elegant realities and our unwavering commitment to excellence
                and client success.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-600 to-blue-700 dark:from-cyan-900 dark:to-blue-950" />
        <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to build something amazing?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-cyan-100">
              Reach out to us today and let's discuss how we can engineer the perfect digital solution for your business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/contact"
                className="rounded-full bg-white px-10 py-4 text-base font-semibold text-cyan-700 shadow-xl hover:bg-cyan-50 hover:scale-105 transition-all duration-300"
              >
                Start a Conversation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About

