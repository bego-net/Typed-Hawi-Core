import ServiceDescription from '../../components/services/ServiceDescription'
import ServiceCards from '../../components/services/ServiceCards'
import ServiceProcess from '../../components/services/ServiceProcess'

function Ecommerce() {
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
                Ecommerce
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                Online stores designed to feel smooth for customers and easy to
                manage for your team.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Storefront UX',
                    description:
                      'Modern layouts, clear navigation, and product discovery built for conversion.',
                  },
                  {
                    title: 'Checkout flow',
                    description:
                      'A smooth path from cart to payment with fewer drop-offs.',
                  },
                  {
                    title: 'Operations',
                    description:
                      'Inventory, orders, customers, and reporting designed for daily efficiency.',
                  },
                  {
                    title: 'Integrations',
                    description:
                      'Payments, shipping, analytics, and marketing tools connected cleanly.',
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
                    What we can build
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                    A complete ecommerce system
                  </h2>

                  <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-600 sm:grid-cols-2">
                    {[
                      'Product catalog + categories',
                      'Search + filtering',
                      'Cart + checkout',
                      'Payments integration',
                      'Order management',
                      'Shipping rules',
                      'Discounts & coupons',
                      'Analytics & reporting',
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
                      { label: 'Speed', value: 'Fast UX' },
                      { label: 'Trust', value: 'Secure' },
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
        eyebrow="Ecommerce"
        title="Sell confidently with a modern shopping experience"
        paragraphs={[
          'We build ecommerce experiences that keep browsing simple, checkout friction low, and store operations straightforward.',
          'From product catalogs to payments and analytics, we focus on reliability, performance, and scalable foundations.',
        ]}
      />

      <ServiceCards
        eyebrow="Features"
        title="Store capabilities"
        items={[
          {
            title: 'Product catalog',
            description:
              'Clean product pages, categories, search, and filtering to help customers find what they need.',
            icon: '01',
          },
          {
            title: 'Smooth checkout',
            description:
              'Streamlined checkout flows designed for higher completion rates.',
            icon: '02',
          },
          {
            title: 'Admin-friendly operations',
            description:
              'Manage inventory, orders, and customer data with a clear management workflow.',
            icon: '03',
          },
        ]}
        columns={3}
      />

      <ServiceProcess
        title="Our ecommerce process"
        steps={[
          {
            title: 'Catalog & requirements',
            description:
              'We define products, categories, shipping rules, and payment requirements.',
          },
          {
            title: 'UX planning',
            description:
              'We design browsing, cart, and checkout flows with a focus on simplicity.',
          },
          {
            title: 'Build',
            description:
              'We implement storefront UI, admin workflows, and integrations.',
          },
          {
            title: 'Testing',
            description:
              'We validate payments, order flows, emails, and edge cases for reliability.',
          },
          {
            title: 'Launch',
            description:
              'We deploy with monitoring and performance checks in place.',
          },
          {
            title: 'Optimization',
            description:
              'We improve conversion, speed, and the store experience based on data.',
          },
        ]}
      />
    </div>
  )
}

export default Ecommerce

