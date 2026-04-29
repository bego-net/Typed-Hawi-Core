import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetails from './pages/ServiceDetails'
import Contact from './pages/Contact'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLogin from './pages/admin/AdminLogin'
import ServicesDashboard from './pages/admin/ServicesDashboard'
import ContactsDashboard from './pages/admin/ContactsDashboard'
import ProductsDashboard from './pages/admin/ProductsDashboard'
import TestimonialsDashboard from './pages/admin/TestimonialsDashboard'
import PartnersDashboard from './pages/admin/PartnersDashboard'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-slate-950 dark:text-white transition-colors duration-500">
      {!isAdminRoute && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<ServicesDashboard />} />
            <Route path="/admin/services" element={<ServicesDashboard />} />
            <Route path="/admin/contacts" element={<ContactsDashboard />} />
            <Route path="/admin/products" element={<ProductsDashboard />} />
            <Route path="/admin/testimonials" element={<TestimonialsDashboard />} />
            <Route path="/admin/partners" element={<PartnersDashboard />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
