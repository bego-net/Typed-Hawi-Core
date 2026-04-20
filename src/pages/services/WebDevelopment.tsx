import ServiceDescription from '../../components/services/ServiceDescription'
import ServiceCards from '../../components/services/ServiceCards'
import ServiceProcess from '../../components/services/ServiceProcess'

function WebDevelopment() {
  return (
    <div className="bg-white">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                Services
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Web development
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                Modern, responsive websites and web applications designed for
                performance, accessibility, and conversion.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Marketing websites',
                    description:
                      'Landing pages, company sites, and campaigns with strong messaging and clean UI.',
                  },
                  {
                    title: 'Web applications',
                    description:
                      'Dashboards, portals, and interactive experiences with reliable routing and state.',
                  },
                  {
                    title: 'Performance',
                    description:
                      'Fast load times, optimized assets, and smooth interactions across devices.',
                  },
                  {
                    title: 'Accessibility',
                    description:
                      'Semantic structure and usable components for a wider audience.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm shadow-slate-200/60"
                  >
                    <p className="text-sm font-semibold text-slate-950">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm shadow-slate-200/70">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_40%)]" />
              <div className="relative p-6 sm:p-8">
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                    What’s included
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                    A professional web delivery
                  </h2>

                  <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-600 sm:grid-cols-2">
                    {[
                      'Responsive layouts',
                      'Reusable components',
                      'Routing & navigation',
                      'Forms & validation',
                      'API integration',
                      'SEO structure',
                      'Analytics hooks',
                      'Deployment support',
                    ].map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          ✓
                        </span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                      { label: 'Speed', value: 'Fast' },
                      { label: 'UX', value: 'Clear' },
                      { label: 'Code', value: 'Maintainable' },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          {s.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-950">
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceDescription
        eyebrow="Web development"
        title="Build fast, secure, and scalable web experiences"
        paragraphs={[
          'We design and develop websites and web applications that look polished, load quickly, and stay maintainable as your business grows.',
          'From landing pages to complex portals, we focus on clear structure, responsive layouts, and reliable engineering so your product performs well across devices.',
        ]}
      />

      <ServiceCards
        eyebrow="Why it matters"
        title="Benefits you can expect"
        items={[
          {
            title: 'Conversion-focused UX',
            description:
              'Clear structure, strong hierarchy, and UI patterns that help users take the next step with confidence.',
            icon: '01',
          },
          {
            title: 'Performance by design',
            description:
              'Optimized loading, clean code, and best practices for fast pages and smooth interactions.',
            icon: '02',
          },
          {
            title: 'SEO-ready foundation',
            description:
              'Semantic markup, accessible components, and technical structure built to support discoverability.',
            icon: '03',
          },
          {
            title: 'Secure & maintainable',
            description:
              'Strong defaults, safe integrations, and a codebase built for long-term ownership and iteration.',
            icon: '04',
          },
          {
            title: 'Mobile-first responsive UI',
            description:
              'Layouts that feel natural on phones, tablets, and desktops without sacrificing design quality.',
            icon: '05',
          },
          {
            title: 'Easy iteration',
            description:
              'A structured build process that keeps changes predictable and releases smooth.',
            icon: '06',
          },
        ]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Technology stack
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Tools we commonly use
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              We choose technologies based on your needs, timelines, and team
              preferences.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'React', hint: 'UI' },
              { name: 'TypeScript', hint: 'Safety' },
              { name: 'Node.js', hint: 'APIs' },
              { name: 'Tailwind CSS', hint: 'Styling' },
              { name: 'Next.js', hint: 'SSR' },
              { name: 'PostgreSQL', hint: 'Data' },
              { name: 'REST / GraphQL', hint: 'Integration' },
              { name: 'CI/CD', hint: 'Delivery' },
            ].map((t) => (
              <div
                key={t.name}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-sm font-bold tracking-[0.18em] text-white shadow-lg shadow-sky-200">
                  {t.name.slice(0, 2).toUpperCase()}
                </div>
                <p className="mt-5 text-base font-semibold text-slate-950">
                  {t.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">{t.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceProcess
        eyebrow="The stages and process"
        title="Our web development process"
        steps={[
          {
            title: 'Requirements & goals',
            description:
              'We clarify objectives, target audience, core pages, and the success metrics for launch.',
          },
          {
            title: 'Planning & architecture',
            description:
              'We define the sitemap, user flows, tech approach, and content structure for a clean build.',
          },
          {
            title: 'UI design & content',
            description:
              'We align visuals, layout rhythm, and page sections to match your brand and messaging.',
          },
          {
            title: 'Development',
            description:
              'We implement components, routing, integrations, and performance best practices.',
          },
          {
            title: 'Testing & QA',
            description:
              'We validate across devices, fix bugs, and ensure accessibility and speed checks pass.',
          },
          {
            title: 'Launch & iteration',
            description:
              'We deploy, monitor, and support improvements as you learn from real users.',
          },
        ]}
      />
    </div>
  )
}

export default WebDevelopment

