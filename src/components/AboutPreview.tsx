import { Link } from 'react-router-dom';

function AboutPreview() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Who We Are</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A software company focused on useful, elegant digital solutions
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Hawi Software Solutions helps organizations strengthen their digital presence with custom platforms, thoughtful interfaces, and systems designed to support real operational needs.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/about"
              className="rounded-md bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
