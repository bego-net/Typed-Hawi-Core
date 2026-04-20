import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-[60vh] bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
            Who We Are
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            A software company focused on useful, elegant digital solutions
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Hawi Software Solutions helps organizations strengthen their
            digital presence with custom platforms, thoughtful interfaces,
            and systems designed to support real operational needs.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
            <div className="relative aspect-[16/10] bg-[linear-gradient(135deg,_#0f172a_0%,_#1e293b_35%,_#2563eb_100%)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.18),_transparent_34%)]" />
              <div className="absolute inset-6 rounded-[1.5rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:inset-8 sm:p-8">
                <div className="grid h-full gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[1.5rem] bg-white/90 p-4 shadow-lg shadow-slate-900/10">
                    <div className="h-full rounded-[1.2rem] border border-slate-200 bg-[linear-gradient(180deg,_#f8fafc_0%,_#e2e8f0_100%)] p-4">
                      <div className="grid h-full gap-3">
                        <div className="h-8 w-28 rounded-full bg-slate-900" />
                        <div className="grid flex-1 grid-cols-3 gap-3">
                          <div className="rounded-2xl bg-sky-100" />
                          <div className="rounded-2xl bg-slate-100" />
                          <div className="rounded-2xl bg-rose-100" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-14 rounded-2xl bg-slate-100" />
                          <div className="h-14 rounded-2xl bg-slate-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/15 bg-white/15 p-5">
                    <div className="flex h-full items-end rounded-[1.2rem] bg-[linear-gradient(180deg,_rgba(255,255,255,0.14)_0%,_rgba(15,23,42,0.35)_100%)] p-5">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                          Company Snapshot
                        </p>
                        <p className="mt-3 max-w-xs text-lg font-semibold text-white">
                          Clean products, structured process, and software
                          experiences made to last.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm shadow-slate-200/70">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Follow Our Journey
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              Like and follow our Facebook page
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Stay connected with our latest updates, product highlights,
              launches, and behind-the-scenes work as we keep building
              better digital experiences.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1877F2] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
