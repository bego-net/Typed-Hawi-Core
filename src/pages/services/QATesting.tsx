import ServiceDescription from '../../components/services/ServiceDescription'
import ServiceCards from '../../components/services/ServiceCards'
import ServiceProcess from '../../components/services/ServiceProcess'

function QATesting() {
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
                Quality assurance and testing
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                Testing that protects product quality, reduces risk, and
                improves user trust.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Release confidence',
                    description:
                      'Know what changed, what was tested, and what risks remain before shipping.',
                  },
                  {
                    title: 'Fewer regressions',
                    description:
                      'Protect existing features while new work is introduced.',
                  },
                  {
                    title: 'Better performance',
                    description:
                      'Validate responsiveness and stability under realistic usage.',
                  },
                  {
                    title: 'Improved usability',
                    description:
                      'Catch friction early and improve clarity for end-users.',
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
                    Coverage areas
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                    What we test
                  </h2>

                  <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-600 sm:grid-cols-2">
                    {[
                      'Functional flows',
                      'Edge cases',
                      'Cross-browser behavior',
                      'Mobile responsiveness',
                      'API integration',
                      'Performance',
                      'Accessibility basics',
                      'Regression suite',
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
                      { label: 'Bugs', value: 'Reduced' },
                      { label: 'UX', value: 'Improved' },
                      { label: 'Releases', value: 'Safer' },
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
        eyebrow="QA & testing"
        title="Improve reliability before your users find issues"
        paragraphs={[
          'We help teams validate functionality, performance, and usability before release.',
          'Our QA process reduces regressions, strengthens stability, and improves confidence in every deployment.',
        ]}
      />

      <ServiceCards
        eyebrow="Testing services"
        title="Testing services that we offer"
        items={[
          {
            title: 'Functional testing',
            description:
              'Ensure features behave as expected across key user flows and edge cases.',
            icon: '01',
          },
          {
            title: 'Performance testing',
            description:
              'Validate responsiveness, speed, and stability under realistic usage conditions.',
            icon: '02',
          },
          {
            title: 'Usability testing',
            description:
              'Confirm the experience is clear, intuitive, and friction-free for users.',
            icon: '03',
          },
          {
            title: 'Compatibility testing',
            description:
              'Test across browsers, devices, and environments to ensure consistent behavior.',
            icon: '04',
          },
          {
            title: 'Regression testing',
            description:
              'Protect existing features when changes are introduced.',
            icon: '05',
          },
          {
            title: 'Automation testing',
            description:
              'Automate critical paths to keep releases safe and repeatable.',
            icon: '06',
          },
        ]}
      />

      <ServiceProcess
        eyebrow="The stages and process"
        title="Our QA & testing process"
        steps={[
          {
            title: 'Requirement analysis',
            description:
              'We clarify expected behavior, risks, and acceptance criteria for each feature.',
          },
          {
            title: 'Test planning',
            description:
              'We define scope, environments, tools, and the right testing strategy.',
          },
          {
            title: 'Test case development',
            description:
              'We create clear test cases and checklists aligned to your product goals.',
          },
          {
            title: 'Environment setup',
            description:
              'We prepare test environments, devices, data, and access needed to validate.',
          },
          {
            title: 'Test execution',
            description:
              'We execute tests, report issues, and track fixes until stability is confirmed.',
          },
          {
            title: 'Test closure',
            description:
              'We summarize results, risks, and recommendations for release readiness.',
          },
        ]}
      />
    </div>
  )
}

export default QATesting

