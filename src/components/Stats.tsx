const stats = [
  { id: 1, name: 'Years of digital delivery', value: '10+' },
  { id: 2, name: 'Reliable support mindset', value: '24/7' },
  { id: 3, name: 'Tailored business solutions', value: '100%' },
];

function Stats() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-slate-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Stats;
