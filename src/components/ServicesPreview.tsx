import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Custom Software Development',
    description: 'Develop reliable software solutions tailored to your unique business workflows and daily operations.',
  },
  {
    title: 'Web Design & Development',
    description: 'Design and build polished websites and digital platforms that balance strong performance with clean UX.',
  },
  {
    title: 'Mobile App Development',
    description: 'Create mobile-first applications that bring services, communication, and productivity into users hands.',
  },
];

function ServicesPreview() {
  return (
    <section className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to grow digitally
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-xl font-semibold leading-7 text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-4 flex-auto text-base leading-7 text-slate-600">
                  {service.description}
                </p>
                <div className="mt-6">
                  <Link to="/services" className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500">
                    Learn More <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
