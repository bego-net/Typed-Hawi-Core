function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[linear-gradient(180deg,_#fffaf8_0%,_#ffffff_48%,_#f8fafc_100%)]"
    >
      <div className="absolute inset-0">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-rose-100 blur-3xl" />
        <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-sky-100 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/90 p-8 shadow-2xl shadow-rose-100/80 backdrop-blur sm:p-10">
            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-rose-100/80 blur-2xl" />
            <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-sky-100 blur-2xl" />
            <div className="relative flex aspect-square items-center justify-center rounded-[2rem] bg-[linear-gradient(135deg,_#fff7f5_0%,_#ffffff_45%,_#f8fafc_100%)]">
              <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
                <div className="absolute left-0 top-0 h-full w-14 rounded-3xl bg-red-600 shadow-xl shadow-red-200" />
                <div className="absolute left-0 top-0 h-14 w-36 rounded-3xl bg-red-600 shadow-xl shadow-red-200" />
                <div className="absolute bottom-0 left-0 h-14 w-36 rounded-3xl bg-red-600 shadow-xl shadow-red-200" />
                <div className="absolute right-0 top-0 h-full w-14 rounded-3xl bg-red-600 shadow-xl shadow-red-200" />
                <div className="absolute right-0 top-0 h-14 w-36 rounded-3xl bg-red-600 shadow-xl shadow-red-200" />
                <div className="absolute bottom-0 right-0 h-14 w-36 rounded-3xl bg-red-600 shadow-xl shadow-red-200" />
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center rounded-full border border-rose-200 bg-white/85 px-4 py-2 text-sm font-medium text-rose-700 shadow-sm shadow-rose-100 backdrop-blur">
            Modern software solutions for ambitious teams
          </span>

          <h1 className="mt-8 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Hawi Software Solutions
          </h1>

          <p className="mt-4 text-xl font-semibold tracking-tight text-slate-700 sm:text-2xl">
            Making Better Future
          </p>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            We design and build thoughtful digital experiences, custom software,
            and business tools that help organizations operate smarter and grow
            with confidence.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20"
            >
              Get Started
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-rose-300 hover:text-slate-950 hover:shadow-lg"
            >
              Explore Services
            </a>
          </div>

          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white/85 px-5 py-5 shadow-sm shadow-slate-200/80 backdrop-blur">
              <p className="text-2xl font-bold tracking-tight text-slate-950">
                10+
              </p>
              <p className="mt-2 text-sm text-slate-600">Years of digital delivery</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/85 px-5 py-5 shadow-sm shadow-slate-200/80 backdrop-blur">
              <p className="text-2xl font-bold tracking-tight text-slate-950">
                24/7
              </p>
              <p className="mt-2 text-sm text-slate-600">Reliable support mindset</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/85 px-5 py-5 shadow-sm shadow-slate-200/80 backdrop-blur">
              <p className="text-2xl font-bold tracking-tight text-slate-950">
                100%
              </p>
              <p className="mt-2 text-sm text-slate-600">Tailored business solutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
