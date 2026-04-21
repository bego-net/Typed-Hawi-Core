import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import CustomSoftware from './pages/services/CustomSoftware'
import WebDevelopment from './pages/services/WebDevelopment'
import MobileApp from './pages/services/MobileApp'
import Consultancy from './pages/services/Consultancy'
import Ecommerce from './pages/services/Ecommerce'
import UIUX from './pages/services/UIUX'
import QATesting from './pages/services/QATesting'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLogin from './pages/admin/AdminLogin'
import ServicesDashboard from './pages/admin/ServicesDashboard'
import ContactsDashboard from './pages/admin/ContactsDashboard'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-950">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/services/custom-software-development"
              element={<CustomSoftware />}
            />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/mobile-app" element={<MobileApp />} />
            <Route path="/services/consultancy" element={<Consultancy />} />
            <Route path="/services/ecommerce" element={<Ecommerce />} />
            <Route path="/services/ui-ux" element={<UIUX />} />
            <Route path="/services/qa-testing" element={<QATesting />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<ServicesDashboard />} />
              <Route path="/admin/services" element={<ServicesDashboard />} />
              <Route path="/admin/contacts" element={<ContactsDashboard />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
