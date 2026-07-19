import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AdministrationPage from './pages/AdministrationPage';
import CitizenServicesPage from './pages/CitizenServicesPage';
import PropertyTaxPage from './pages/PropertyTaxPage';
import WaterTaxPage from './pages/WaterTaxPage';
import ComplaintPortalPage from './pages/ComplaintPortalPage';
import DevelopmentWorksPage from './pages/DevelopmentWorksPage';
import SchemesPage from './pages/SchemesPage';
import GalleryPage from './pages/GalleryPage';
import NewsPage from './pages/NewsPage';
import DownloadsPage from './pages/DownloadsPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="administration" element={<AdministrationPage />} />
          <Route path="services" element={<CitizenServicesPage />} />
          <Route path="services/property-tax" element={<PropertyTaxPage />} />
          <Route path="services/water-tax" element={<WaterTaxPage />} />
          <Route path="services/complaint" element={<ComplaintPortalPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="development" element={<DevelopmentWorksPage />} />
          <Route path="schemes" element={<SchemesPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
