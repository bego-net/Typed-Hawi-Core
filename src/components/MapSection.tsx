function MapSection() {
  return (
    <section id="location" className="bg-slate-50 dark:bg-[#0a0a0a] py-24 sm:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-cyan-600 dark:text-cyan-400">Our Location</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Find Us on the Map
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Visit our office or reach out — we'd love to connect with you.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative group overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-500">
          <div className="absolute inset-0 bg-cyan-600/5 dark:bg-cyan-400/5 pointer-events-none" />
          <iframe
            title="Hawi Software Solution Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d39.2768498!3d8.5487015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1f785681d139%3A0xa42c759b7c328baf!2sG7XG%2BFQH!5e0!3m2!1sen!2set!4v1713700000000"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full grayscale-[0.2] contrast-[1.1] transition-transform duration-700 group-hover:scale-[1.01]"
          />
        </div>
      </div>
    </section>
  )
}

export default MapSection

