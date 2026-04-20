import ServiceDescription from '../../components/services/ServiceDescription'
import ServiceCards from '../../components/services/ServiceCards'
import ServiceProcess from '../../components/services/ServiceProcess'

function MobileApp() {
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
                Mobile app development
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                User-friendly mobile experiences built for speed, clarity, and
                long-term evolution.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'MVP to launch',
                    description:
                      'Start small with a clear MVP and iterate safely toward a complete product.',
                  },
                  {
                    title: 'Great UX',
                    description:
                      'Simple navigation, predictable patterns, and interfaces users understand quickly.',
                  },
                  {
                    title: 'Performance',
                    description:
                      'Fast screens, optimized assets, and stable behavior across devices.',
                  },
                  {
                    title: 'Integrations',
                    description:
                      'APIs, authentication, notifications, and third-party services connected cleanly.',
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
                    Common features
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                    Everything users expect in a modern app
                  </h2>

                  <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-600 sm:grid-cols-2">
                    {[
                      'Authentication',
                      'User profiles',
                      'Search & filters',
                      'Offline-friendly UX',
                      'Notifications',
                      'Payments (if needed)',
                      'Analytics events',
                      'App store readiness',
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
                      { label: 'UX', value: 'Simple' },
                      { label: 'Build', value: 'Reliable' },
                      { label: 'Future', value: 'Scalable' },
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
        eyebrow="Mobile apps"
        title="Bring your service into users’ hands"
        paragraphs={[
          'We design and develop mobile applications that keep interfaces simple, performance fast, and the product easy to maintain.',
          'From MVPs to full-featured apps, we focus on usability, stability, and a clean foundation for future releases.',
        ]}
      />

      <ServiceCards
        eyebrow="Highlights"
        title="What we prioritize"
        items={[
          {
            title: 'Smooth user experience',
            description:
              'Clean UI patterns, intuitive navigation, and clear feedback at every step.',
            icon: '01',
          },
          {
            title: 'Reliable performance',
            description:
              'Fast loading screens, optimized assets, and stable behavior across devices.',
            icon: '02',
          },
          {
            title: 'Scalable architecture',
            description:
              'A maintainable codebase that supports new features and integrations over time.',
            icon: '03',
          },
        ]}
        columns={3}
      />

      <ServiceProcess
        title="Our mobile app process"
        steps={[
          {
            title: 'Requirements & scope',
            description:
              'We define the target users, key flows, and the best MVP scope to ship.',
          },
          {
            title: 'UX & UI design',
            description:
              'We design screens and interactions that match user expectations and brand tone.',
          },
          {
            title: 'Development',
            description:
              'We build the app, APIs, and integrations with clear milestones and demos.',
          },
          {
            title: 'Testing',
            description:
              'We validate critical paths, edge cases, and device compatibility for stability.',
          },
          {
            title: 'Release',
            description:
              'We prepare deployment and ensure a smooth launch across the intended channels.',
          },
          {
            title: 'Iteration',
            description:
              'We improve based on real usage, analytics, and feedback from users.',
          },
        ]}
      />
    </div>
  )
}

export default MobileApp

