import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../Constants';

const Footer = () => {
  return (
    <footer className="bg-[#6F1A07] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
          {/* Logo and Description */}
          <div>
            <div className="text-lg sm:text-2xl font-bold">
                <Link to={'/'}>multaqa</Link>
            </div>
            <p className='text-sm mt-4'>Join us for an unforgettable experience with speakers, networking, and more.</p>
          </div>

          {/* Navigation Links */}
        <div>
            {/* <h2 className="text-sm sm:text-lg font-bold text-white mb-4">Quick Links</h2> */}
            <div className='flex items-center justify-between mt-10 flex-wrap'>
                {navLinks.slice(1,5).map((navLink) => (
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

          {/* Contact Info
          <div>
            <h2 className="text-sm sm:text-lg font-bold text-white mb-4">Contact Us</h2>
            <ul className='ml-4 text-sm'>
              <li className="mb-4"><Link to="mailto:info@example.com" className="hover:underline transition duration-500">multaqa.com</Link></li>
              <li className="mb-4"><Link to="tel:+1234567890" className="hover:underline transition duration-500">+1 (234) 567-890</Link></li>
              <li className="mb-4"><Link to="https://maps.google.com" className="hover:underline transition duration-500">123 Event Street, City, Country</Link></li>
            </ul>
          </div> */}
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
