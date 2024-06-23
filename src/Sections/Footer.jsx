import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../Constants';

const Footer = () => {
  const userType = localStorage.getItem('userType');

  const getVisibleNavLinks = () => {
    const filteredNavLinks = navLinks.slice(1, 7);
    if (userType === 'Attendee' || userType === 'attendee') {
      return filteredNavLinks.filter((_, index) => index !== 1 && index !== 2);
    } else if (userType === 'Organizer' || userType === 'organizer') {
      return filteredNavLinks.filter((_, index) => index !== 0 && index !== 2);
    }
    return filteredNavLinks.filter((_, index) => index !== 2);
  };

  return (
    <footer className="bg-[#6F1A07] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
          {/* Logo and Description */}
          <div>
            <div className="text-lg sm:text-2xl font-semibold">
              <Link to={'/'}>multaqa</Link>
            </div>
            <p className='text-sm mt-4'>Join us for an unforgettable experience with speakers, networking, and more.</p>
          </div>

          {/* Navigation Links */}
          <div>
            <div className='flex items-center justify-between mt-10 flex-wrap gap-x-4'>
              {getVisibleNavLinks().map((navLink) => (
                <NavLink
                  key={navLink.label}
                  to={navLink.href}
                  className='hover:text-[#A8763E] transition duration-300 md:py-2 rounded-md text-sm font-semibold'
                  activeClassName="text-[#A8763E]"
                >
                  {navLink.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-xs font-medium mt-8 text-center bg-[#2B2118] py-2">
        &copy; 2024 <Link to={'/'} className='text-sm font-bold'>multaqa</Link>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
