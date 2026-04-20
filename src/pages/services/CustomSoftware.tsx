import ServiceDescription from '../../components/services/ServiceDescription'
import ServiceCards from '../../components/services/ServiceCards'
import ServiceProcess from '../../components/services/ServiceProcess'

function CustomSoftware() {
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
                Custom software development
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                Tailor-made systems built to match your workflows, automate
                operations, and unlock better visibility.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Internal systems',
                    description:
                      'Admin tools, dashboards, and operational workflows built around your team.',
                  },
                  {
                    title: 'Customer portals',
                    description:
                      'Secure self-service experiences for customers, partners, and stakeholders.',
                  },
                  {
                    title: 'Automation',
                    description:
                      'Digitize approvals, reduce manual work, and keep data consistent.',
                  },
                  {
                    title: 'Reporting',
                    description:
                      'Actionable visibility through metrics, exports, and role-based insights.',
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
                    Typical modules
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                    A platform built around your operations
                  </h2>

                  <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-600 sm:grid-cols-2">
                    {[
                      'Role-based access',
                      'Workflow approvals',
                      'Audit trails',
                      'Dashboards',
                      'Reports + exports',
                      'Notifications',
                      'Integrations',
                      'Data migration',
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
                      { label: 'Quality', value: 'Reliable' },
                      { label: 'Security', value: 'Safe' },
                      { label: 'Growth', value: 'Scalable' },
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
        eyebrow="Custom software"
        title="Software that fits the way your team works"
        paragraphs={[
          'We build custom applications that reduce manual work, improve data accuracy, and support day-to-day operations.',
          'Whether you need an internal tool, a customer portal, or a full platform, we focus on reliable delivery and long-term maintainability.',
        ]}
      />

      <ServiceCards
        eyebrow="Benefits"
        title="What you gain"
        items={[
          {
            title: 'Workflow automation',
            description:
              'Replace repetitive tasks with streamlined digital processes and approvals.',
            icon: '01',
          },
          {
            title: 'Clear reporting',
            description:
              'Dashboards and data views that help teams see what is happening and act faster.',
            icon: '02',
          },
          {
            title: 'Scalable foundations',
            description:
              'Architecture designed to grow as your users, features, and data increase.',
            icon: '03',
          },
        ]}
        columns={3}
      />

      <ServiceProcess
        title="Our delivery process"
        steps={[
          {
            title: 'Discovery',
            description:
              'We map your workflows, requirements, and risks to define the right scope.',
          },
          {
            title: 'Design & planning',
            description:
              'We outline user journeys, key screens, and a delivery plan with clear milestones.',
          },
          {
            title: 'Build & validate',
            description:
              'We develop in iterations and validate with your team to keep progress aligned.',
          },
          {
            title: 'Launch & support',
            description:
              'We deploy, train users, and continue improving based on feedback and data.',
          },
          {
            title: 'Optimization',
            description:
              'We tune performance and add features as your needs evolve.',
          },
          {
            title: 'Long-term partnership',
            description:
              'We provide ongoing maintenance and roadmap planning for sustainable growth.',
          },
        ]}
      />
    </div>
  )
}

export default CustomSoftware

