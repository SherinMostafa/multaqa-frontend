import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { navLinks } from '../Constants/index';
import Search from '../Components/Search';
import Button from '../Components/Button';
import { CgMenuRightAlt, CgClose } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import AuthContext from '../Context/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const userType = localStorage.getItem('userType'); // Corrected localStorage key

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isLoggedIn && !userType) {
      navigate('/Welcome');
    }
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsFixed(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate, userType, isLoggedIn]);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/users/logout');
      localStorage.clear();
      logout();
      navigate('/Login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const getVisibleNavLinks = () => {
    const filteredNavLinks = navLinks.slice(1, 6);
    if (userType === 'Attendee' || userType === 'attendee') {
      return filteredNavLinks.filter((_, index) => index !== 1);
    } else if (userType === 'Organizer' || userType === 'organizer') {
      return filteredNavLinks.filter((_, index) => index !== 0 && index !== 2);
    }
    return filteredNavLinks.filter((_, index) => index !== 2);
  };

  const isCreatePage = location.pathname === '/Create' || location.pathname === '/Ticket' || location.pathname === '/Checkout';

  return (
    <>
      <nav className={`${isFixed ? 'sticky top-0 left-0 right-0 z-50 shadow-md' : ''} bg-white transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0 text-[#6F1A07] text-lg sm:text-2xl font-semibold mr-4">
              <Link to={'/'} onClick={closeNavbar}>
                <img src="multaqa-logo.png" alt="multaqa" class="hidden md:block w-24" />
                <img src="multaqa-icon.jpg" alt="multaqa" class="block md:hidden w-8 sm:w-12 border rounded-md" />
              </Link>
            </div>
            {!isCreatePage && (
              <div className='w-40 sm:w-auto hidden md:block'>
                <Search placeholder={'Search events ...'} />
              </div>
            )}
            {!isCreatePage && (
              <div className="hidden lg:flex items-center justify-center">
                {getVisibleNavLinks().map((navLink) => (
                  <NavLink
                    key={navLink.label}
                    to={navLink.href}
                    className='text-[#2B2118] hover:text-[#A8763E] transition duration-500 px-4 py-2 rounded-md text-sm font-semibold flex-none'
                    onClick={closeNavbar}
                  >
                    {navLink.label}
                  </NavLink>
                ))}
              </div>
            )}
            <div className="ml-2 flex items-center">
              {isLoggedIn ? (
                <div className='relative group'>
                  <div className='flex items-center gap-2 text-sm font-semibold text-[#2B2118] transition duration-500 cursor-pointer'>
                    <FaUser className="p-1 w-5 h-5 md:w-6 md:h-6 mx-auto text-gray-400 border rounded-full" />
                    {user.fname} {user.lname}
                  </div>
                  <div className="absolute right-0 top-6 z-50 w-48 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-96 group-hover:py-2">
                    {userType === 'Organizer' && (
                      <NavLink
                        to="/Settings"
                        className="block pl-6 py-2 text-sm text-[#2B2118] hover:text-[#A8763E] transition duration-500"
                        onClick={closeNavbar}
                      >
                        Manage Events
                      </NavLink>
                    )}
                    <NavLink
                      to={{
                        pathname: '/Account',
                        state: { openUserInfo: true }
                      }}
                      className="block pl-6 py-2 text-sm text-[#2B2118] hover:text-[#A8763E] transition duration-500 border-b-2"
                      onClick={closeNavbar}
                    >
                      Settings
                    </NavLink>
                    <button className="block w-full text-left pl-6 py-2 text-sm text-[#2B2118] hover:text-[#A8763E] transition duration-500 focus:outline-none" onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              ) : (
                <div className='flex items-center'>
                  <Button link={true} label={'Sign up'} linkURL={'/Register'} customStyle={'mr-4 md:mr-8 text-sm'} onClick={closeNavbar} />
                  <Button label={'Sign in'} linkURL={'/Login'} customStyle={'py-2 px-4 text-sm'} onClick={closeNavbar} />
                </div>
              )}
              {!isCreatePage && (
                <div className="-mr-2 flex lg:hidden">
                  <button onClick={toggleNavbar} className="text-[#6F1A07] hover:text-[#A8763E] transition duration-500 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {isOpen ? <CgClose className="h-6 w-6 md:h-8 md:w-8 md:ml-4" /> : <CgMenuRightAlt className="h-6 w-6 md:h-8 md:w-8 md:ml-4" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Overlay */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-30`} onClick={closeNavbar}></div>
        {/* Mobile menu, show/hide based on menu state. */}
        <div className={`fixed top-0 right-0 h-full bg-white shadow-md transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden z-40 w-3/4`}>
          <div className="flex justify-end p-4">
            <button onClick={closeNavbar} className="text-[#6F1A07] hover:text-[#A8763E] transition duration-500">
              <CgClose className="h-6 w-6 md:h-8 md:w-8" />
            </button>
          </div>
          <div className="pb-6">
            {getVisibleNavLinks().map((navLink) => (
              <NavLink
              key={navLink.label}
              to={navLink.href}
              className='text-[#2B2118] hover:text-[#A8763E] transition duration-500 block px-6 py-2 rounded-md text-base font-medium'
              onClick={closeNavbar}
              >
                {navLink.label}
              </NavLink>
            ))}
            {!isCreatePage && (
                <div className='w-full px-4 mt-8 sm:w-auto md:hidden block'>
                  <Search placeholder={'Search events ...'} />
                </div>
              )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
