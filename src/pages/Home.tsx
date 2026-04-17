import ServiceList from '../components/ServiceList'

function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-6 py-10 shadow-sm sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
            Our Services
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Hawi Software Solutions
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Explore the services we offer through our Laravel-powered API.
          </p>
        </section>

        <ServiceList />
      </div>
    </main>
  )
}

export default Home
