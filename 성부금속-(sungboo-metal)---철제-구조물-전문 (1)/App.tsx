
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SiteProvider } from './store/SiteContext';
import Navbar from './components/Layout/Navbar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <SiteProvider>
      <Router>
        <AppContent />
      </Router>
    </SiteProvider>
  );
};

export default App;
