import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const Organizer = () => {
  const handleFollowClick = () => {
    alert('You have successfully followed this page');
  };

  return (
      <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-opacity-75 px-4  sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg text-center max-w-md w-full">
          <div className="mb-4">
            <img src="/images/Login.jpg" alt="Draw Brighton" className="mx-auto w-24 h-24 rounded-full" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Page Name</h1>
          <button
            onClick={handleFollowClick}
            className="bg-[#6F1A07] hover:bg-[#A8763E] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full mb-4"
          >
            Follow
          </button>
          <p className="text-gray-700 mb-4">
            10.2K Followers<br />
          </p>
          <p className="text-gray-600">
            At Draw we run affordable online and in-person drawing, painting and printmaking classes, open to everybody. We run online life classes and printmaking-from-home courses for our international drawing community, as well as weekly in-person sessions from our Brighton studio. You can sign up to the Draw Patreon for discounts on our in-person sessions, tiered...
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="https://twitter.com/DrawBrighton" className="text-blue-400" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
            <a href="https://facebook.com/DrawBrighton" className="text-blue-600" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com/DrawBrighton" className="text-pink-400" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full p-4 sm:p-6 lg:p-8">
        <div className="flex justify-center items-center space-x-4">
          <nav className="flex space-x-6 text-lg font-semibold">
            <a href="#events" className="text-[#6F1A07] hover:text-[#A8763E] border-b-2 border-[#6F1A07]">Events</a>
          </nav>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex justify-center">Events</h2>
          <div className="mt-2 flex justify-center space-x-4">
            <button className="bg-transparent text-[#6F1A07] border border-[#6F1A07] hover:bg-[#A8763E] hover:border-[#A8763E] hover:text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full">Past (232)</button>
          </div>
        </div>
      </div>
      </div>
    
  );
};

export default Organizer;