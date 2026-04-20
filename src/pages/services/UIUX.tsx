import ServiceDescription from '../../components/services/ServiceDescription'
import ServiceCards from '../../components/services/ServiceCards'
import ServiceProcess from '../../components/services/ServiceProcess'

function UIUX() {
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
                UI/UX design
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                Design systems and interfaces that keep users comfortable,
                informed, and confident.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Interface clarity',
                    description:
                      'Strong hierarchy, spacing, and typography that make screens easy to scan.',
                  },
                  {
                    title: 'User flows',
                    description:
                      'Simple task journeys that reduce confusion and increase completion.',
                  },
                  {
                    title: 'Design systems',
                    description:
                      'Reusable components and rules for consistent UI across the product.',
                  },
                  {
                    title: 'Handoff support',
                    description:
                      'Specs and guidance for developers to implement accurately and quickly.',
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
                    Deliverables
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                    Practical outputs for implementation
                  </h2>

                  <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-600 sm:grid-cols-2">
                    {[
                      'Wireframes',
                      'High-fidelity UI',
                      'Component library',
                      'Design tokens',
                      'User flow maps',
                      'Interaction notes',
                      'Accessibility checks',
                      'Handoff specs',
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
                      { label: 'UI', value: 'Polished' },
                      { label: 'UX', value: 'Simple' },
                      { label: 'Team', value: 'Aligned' },
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
        eyebrow="UI/UX"
        title="Design that improves user experience and outcomes"
        paragraphs={[
          'We create user-centered interfaces with clear hierarchy, clean visuals, and predictable interactions.',
          'Our goal is to reduce friction, increase trust, and make it easy for users to complete key tasks.',
        ]}
      />

      <ServiceCards
        eyebrow="Reasons"
        title="Why efficient UI/UX matters"
        items={[
          {
            title: 'Improved customer satisfaction',
            description:
              'Users feel confident when the interface is clear, consistent, and easy to navigate.',
            icon: '01',
          },
          {
            title: 'Build your brand',
            description:
              'A polished design creates trust and strengthens how customers perceive your product.',
            icon: '02',
          },
          {
            title: 'Save time and cost',
            description:
              'Good UX reduces support burden and rework by preventing confusion and errors.',
            icon: '03',
          },
        ]}
        columns={3}
      />

      <ServiceProcess
        eyebrow="The stages and process"
        title="Our UI/UX design process"
        steps={[
          {
            title: 'Planning',
            description:
              'We define goals, constraints, and what success looks like for the product experience.',
          },
          {
            title: 'Kick-off research',
            description:
              'We learn about users, competitors, and context to guide the design direction.',
          },
          {
            title: 'Designing',
            description:
              'We create flows, wireframes, and final UI with strong hierarchy and visual rhythm.',
          },
          {
            title: 'Implementation',
            description:
              'We support developers with design specs, components, and acceptance criteria.',
          },
          {
            title: 'Optimization',
            description:
              'We refine based on feedback, data, and usability observations.',
          },
          {
            title: 'Testing',
            description:
              'We validate the experience with users and iterate to improve clarity and completion.',
          },
        ]}
      />
    </div>
  )
}

export default UIUX

