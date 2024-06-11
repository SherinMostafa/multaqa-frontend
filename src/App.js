import React, { useState, useEffect } from 'react';
import 'swiper/css';
import BarLoader from 'react-spinners/BarLoader';
import Navbar from './Sections/Navbar';
import Footer from './Sections/Footer';
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import { events, navLinks } from './Constants/index';
import Event from './Pages/Event';
import { FaArrowUp } from "react-icons/fa";
import { AuthProvider } from './Context/AuthContext';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center h-screen'>
          <BarLoader color="#6F1A07" height={6} width={178} />
        </div>
      ) : (
        <AuthProvider>
          <BrowserRouter>
            <MainContent />
            {isScrolled && (
              <button 
                onClick={scrollToTop}
                className="fixed bottom-4 right-4 z-50 bg-[#6F1A07] text-white p-2 rounded-full shadow-lg"
              >
                <FaArrowUp className="text-lg" />
              </button>
            )}
          </BrowserRouter>
        </AuthProvider>
      )}
    </>
  );
};

const MainContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/Register', '/Login', '/Welcome', '/Interests'];
  const hideFooterRoutes = ['/Welcome', '/Interests'];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        {navLinks.map((navLink) => (
          <Route key={navLink.label} path={navLink.href} element={navLink.page} />
        ))}
        {events.map(event => (
          <Route key={event.id} path={`/event/${event.id}`} element={<Event event={event} />} />
        ))}
      </Routes>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
