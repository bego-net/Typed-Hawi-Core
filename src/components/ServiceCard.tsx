import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineArrowRight } from 'react-icons/hi2'

interface ServiceCardProps {
  title: string
  slug: string
  short_description: string
  icon: string
  image_url?: string | null
}

function ServiceCard({ title, slug, short_description, icon, image_url }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link
        to={`/services/${slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 dark:border-slate-800 dark:bg-slate-900"
      >
        {/* Card Header / Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          {image_url ? (
            <img
              src={image_url}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <span className="text-4xl">{icon}</span>
            </div>
          )}
          
          {/* Floating Icon Over Image if image exists */}
          {image_url && icon && (
            <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 p-2 shadow-lg backdrop-blur-sm dark:bg-slate-800/90">
              <span className="text-2xl">{icon}</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-primary dark:text-white">
            {title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {short_description}
          </p>
          
          <div className="mt-auto pt-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-primary-dark">
              View Details
              <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ServiceCard
