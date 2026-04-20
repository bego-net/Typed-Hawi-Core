import ServiceDescription from '../../components/services/ServiceDescription'
import ServiceCards from '../../components/services/ServiceCards'
import ServiceProcess from '../../components/services/ServiceProcess'

function Consultancy() {
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
                Software consultancy
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                Practical guidance that turns unclear ideas into actionable
                plans, architecture, and delivery milestones.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Product discovery',
                    description:
                      'Clarify goals, users, scope boundaries, and what “done” means.',
                  },
                  {
                    title: 'Technical direction',
                    description:
                      'Choose the right approach for architecture, data, integrations, and scaling.',
                  },
                  {
                    title: 'Risk reduction',
                    description:
                      'Identify constraints early and avoid costly rework later.',
                  },
                  {
                    title: 'Roadmap planning',
                    description:
                      'Milestones, estimates, and priorities that keep delivery measurable.',
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
                    Clear outputs your team can act on
                  </h2>

                  <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-600 sm:grid-cols-2">
                    {[
                      'Requirements document',
                      'User flows',
                      'Technical recommendation',
                      'Architecture diagram',
                      'Milestone plan',
                      'Risk register',
                      'Backlog outline',
                      'Review checklist',
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
                      { label: 'Plan', value: 'Clear' },
                      { label: 'Teams', value: 'Aligned' },
                      { label: 'Delivery', value: 'Focused' },
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
        eyebrow="Consultancy"
        title="Make the right decisions early"
        paragraphs={[
          'We help teams clarify requirements, choose the right technology direction, and plan delivery in a way that reduces risk.',
          'Whether you are launching a new product or improving an existing system, our focus is simple: align stakeholders and move forward with confidence.',
        ]}
      />

      <ServiceCards
        eyebrow="What you get"
        title="Consulting outcomes"
        items={[
          {
            title: 'Product clarity',
            description:
              'Clear goals, scope boundaries, and user flows that everyone can align on.',
            icon: '01',
          },
          {
            title: 'Architecture direction',
            description:
              'A recommended approach for structure, integrations, and scaling considerations.',
            icon: '02',
          },
          {
            title: 'Delivery plan',
            description:
              'Milestones, timelines, and a plan that makes progress visible and measurable.',
            icon: '03',
          },
        ]}
        columns={3}
      />

      <ServiceProcess
        title="How consultancy works"
        steps={[
          {
            title: 'Assessment',
            description:
              'We review context, constraints, existing systems, and immediate priorities.',
          },
          {
            title: 'Workshops',
            description:
              'We gather requirements, clarify edge cases, and align on what matters most.',
          },
          {
            title: 'Recommendations',
            description:
              'We propose architecture, tools, and a plan tailored to your constraints.',
          },
          {
            title: 'Roadmap',
            description:
              'We outline phases and milestones to support incremental, safe delivery.',
          },
          {
            title: 'Implementation support',
            description:
              'We support your team during build with reviews, guidance, and problem-solving.',
          },
          {
            title: 'Iteration',
            description:
              'We refine the plan as you learn from real users and project progress.',
          },
        ]}
      />
    </div>
  )
}

export default Consultancy

