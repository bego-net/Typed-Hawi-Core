function MapSection() {
  return (
    <section id="location" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full border border-sky-200 bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
            Our Location
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Find Us on the Map
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Visit our office or reach out — we'd love to connect with you.
          </p>
        </div>

        {/* Map */}
        <div className="group overflow-hidden rounded-3xl border border-slate-200 shadow-lg shadow-sky-100/50 transition-shadow duration-500 hover:shadow-xl hover:shadow-sky-200/60">
          <iframe
            title="Hawi Software Solution Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d39.2768498!3d8.5487015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1f785681d139%3A0xa42c759b7c328baf!2sG7XG%2BFQH!5e0!3m2!1sen!2set!4v1713700000000"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>
  )
}

export default MapSection
