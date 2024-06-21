import React, { useState, useEffect } from 'react';
import 'swiper/css';
import BarLoader from 'react-spinners/BarLoader';
import Navbar from './Sections/Navbar';
import Footer from './Sections/Footer';
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import { navLinks } from './Constants/index'; // Remove events from imports
import { FaArrowUp } from "react-icons/fa";
import { AuthProvider } from './Context/AuthContext';
import Ticket from './Pages/Ticket';
import Event from './Pages/Event';
import Organizer from './Pages/Organizer';

const App = () => {
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate loading or fetching data
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false); // After fetching data, set loading to false
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Handle error and set loading to false
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
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
            <MainContent isScrolled={isScrolled} scrollToTop={scrollToTop} />
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

const MainContent = ({ isScrolled, scrollToTop }) => {
  const location = useLocation();
  const hideNavbarRoutes = ['/Register', '/Login', '/Welcome', '/Interests', '/Confirmation', '/Admin', '/Dashboard'];
  const hideFooterRoutes = ['/Welcome', '/Interests', '/Create', '/Ticket', '/Checkout', '/Confirmation', '/Admin', '/Dashboard'];
  
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
        <Route path="/Organizer/:userId" element={<Organizer />} />
        <Route path="/Event/:eventId" element={<Event />} />
        <Route path="/Tickets/:eventId" element={<Ticket />} />
      </Routes>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
