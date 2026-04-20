import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import ServiceCard from '../components/ServiceCard'

const services = [
  {
    title: 'Brand Identity Development',
    description:
      'Craft memorable brand systems, visual direction, and messaging that help companies present themselves with clarity.',
    icon: '01',
  },
  {
    title: 'Web Design and Development',
    description:
      'Design and build polished websites and digital platforms that balance strong performance with clean user experience.',
    icon: '02',
  },
  {
    title: 'Custom Software Development',
    description:
      'Develop reliable software solutions tailored to business workflows, reporting needs, and day-to-day operations.',
    icon: '03',
  },
  {
    title: 'Mobile Application Development',
    description:
      'Create mobile-first applications that bring services, communication, and productivity into the hands of users.',
    icon: '04',
  },
]

const workProcess = [
  {
    title: 'Choose a Service',
    description:
      'Select the service that matches your business goals, product idea, or digital challenge.',
    icon: '01',
  },
  {
    title: 'Request a Meeting',
    description:
      'We schedule a discovery session to understand your needs and define the right direction.',
    icon: '02',
  },
  {
    title: 'Receive Custom Plan',
    description:
      'You get a tailored execution plan covering scope, priorities, and a practical delivery path.',
    icon: '03',
  },
  {
    title: 'We Make It Happen',
    description:
      'Our team designs, builds, and refines the solution until it is ready to create impact.',
    icon: '04',
  },
]

const products = [
  {
    title: 'Education Management System (Estudent)',
    description:
      'A flexible school management platform for admissions, academics, communication, and administration.',
    eyebrow: 'Education Platform',
    accentClassName:
      'bg-[linear-gradient(135deg,_#0f172a_0%,_#334155_40%,_#22c55e_100%)]',
  },
  {
    title: 'Education Management System (Estudent - higher ed)',
    description:
      'Built for colleges and universities with tools for departments, programs, records, and student operations.',
    eyebrow: 'Higher Education',
    accentClassName:
      'bg-[linear-gradient(135deg,_#1d4ed8_0%,_#38bdf8_42%,_#dbeafe_100%)]',
  },
  {
    title: 'Learning Management System (LMS)',
    description:
      'Support online learning, course delivery, assessments, and learner progress with a modern LMS experience.',
    eyebrow: 'Learning Platform',
    accentClassName:
      'bg-[linear-gradient(135deg,_#0f766e_0%,_#14b8a6_45%,_#ccfbf1_100%)]',
  },
  {
    title: 'HR Management System',
    description:
      'Streamline employee records, onboarding, leave management, and performance workflows in one place.',
    eyebrow: 'People Operations',
    accentClassName:
      'bg-[linear-gradient(135deg,_#7c2d12_0%,_#f97316_45%,_#ffedd5_100%)]',
  },
  {
    title: 'Record Management Systems',
    description:
      'Organize, secure, and retrieve critical institutional records with efficient digital record workflows.',
    eyebrow: 'Records & Compliance',
    accentClassName:
      'bg-[linear-gradient(135deg,_#581c87_0%,_#a855f7_45%,_#f3e8ff_100%)]',
  },
  {
    title: 'Websites',
    description:
      'Launch professional marketing websites and business portals that communicate clearly and convert confidently.',
    eyebrow: 'Web Presence',
    accentClassName:
      'bg-[linear-gradient(135deg,_#be123c_0%,_#fb7185_45%,_#ffe4e6_100%)]',
  },
]

const testimonials = [
  {
    quote:
      'Hawi Software brought structure, speed, and polish to our digital presence. The result feels modern and genuinely aligned with our business.',
    name: 'Operations Lead',
    company: 'Regional Training Institute',
  },
  {
    quote:
      'Their team translated our ideas into a clear product roadmap and an interface our users immediately understood. That clarity made a huge difference.',
    name: 'Project Coordinator',
    company: 'Education Services Team',
  },
]

const partners = [
  'African Union',
  'EduTech East Africa',
  'BlueWave Systems',
  'Digital Growth Hub',
  'Future Skills Africa',
]

function Home() {
  return (
      <main>
        <Hero />

        <section id="services" className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-rose-700">
                Services Highlights
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Digital services built to move brands and businesses forward
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                We combine strategy, design, and software engineering to create
                practical solutions that look polished and perform reliably.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-20 sm:py-24">
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
                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1877F2] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                Work Process
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                A simple process that keeps every project clear and focused
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {workProcess.map((step) => (
                <article
                  key={step.title}
                  className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-100"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-bold tracking-[0.24em] text-white shadow-lg shadow-emerald-200">
                    {step.icon}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-violet-700">
                Our Products
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Platforms and systems designed around real organizational needs
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Our product portfolio supports learning, administration,
                operations, records, and digital presence for institutions and
                businesses.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
                Testimonials
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Customer Reviews
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/70"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-lg font-bold text-white shadow-lg shadow-slate-300/60">
                    “
                  </div>
                  <p className="mt-6 text-base leading-8 text-slate-600">
                    {testimonial.quote}
                  </p>
                  <div className="mt-6">
                    <p className="text-base font-semibold text-slate-950">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {testimonial.company}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">
                Partners
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Trusted by institutions and teams that value reliable delivery
              </h2>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {partners.map((partner) => (
                <div
                  key={partner}
                  className="flex min-h-24 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-slate-950 hover:shadow-lg"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
  )
}

export default Home
