const steps = [
  { id: '01', name: 'Choose a Service', description: 'Select the service that matches your business goals.' },
  { id: '02', name: 'Request a Meeting', description: 'We schedule a discovery session to understand your needs.' },
  { id: '03', name: 'Receive Custom Plan', description: 'You get a tailored execution plan covering scope and path.' },
  { id: '04', name: 'We Make It Happen', description: 'Our team designs, builds, and refines the solution.' },
];

function Process() {
  return (
    <section className="bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-400">Work Process</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A clear path to digital success
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {steps.map((step) => (
              <div key={step.id} className="relative flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-xl font-bold text-blue-400 ring-1 ring-blue-500/20">
                  {step.id}
                </div>
                <h3 className="text-lg font-semibold leading-8 text-white">{step.name}</h3>
                <p className="mt-2 text-base leading-7 text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
