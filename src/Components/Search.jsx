import React, { useState, useEffect } from 'react';
import { HiSearch, HiX } from 'react-icons/hi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = ({ placeholder, className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isResultsOpen, setIsResultsOpen] = useState(false); // State to track if results are open
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert('Please enter a search term.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/event/search?title=${encodeURIComponent(searchTerm)}`);
      const filteredResults = response.data.filter(event => event.availableTickets > 0);
      setSearchResults(filteredResults);
      setIsResultsOpen(true); // Open results after successful search
    } catch (error) {
      console.error('Error searching events:', error.response?.data || error.message);
      console.log('Failed to search events. Please try again later.');
    }
  };

  const handleEventClick = (eventId) => {
    navigate(`/Event/${eventId}`);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsResultsOpen(false);
  };

  useEffect(() => {
    // Function to handle clicks outside the component
    const handleClickOutside = (event) => {
      if (event.target.closest('.search-container') === null) {
        setIsResultsOpen(false); // Close results if click is outside the search container
      }
    };

    // Add event listener when component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className} search-container`}>
      <div className="relative w-full lg:w-auto">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-2 text-xs sm:text-sm border border-[#ECF0F1] rounded-full leading-5 bg-white text-[#2B2118] placeholder-[#A8763E] focus:outline-none focus:border-[#A8763E] focus:placeholder-[#2B2118]"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
          <HiSearch className="text-[#A8763E] text-lg cursor-pointer" onClick={handleSearch} />
        </div>
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <HiX className="text-[#A8763E] text-md cursor-pointer" onClick={handleClearSearch} />
          </div>
        )}
      </div>

      {isResultsOpen && searchResults.length > 0 && (
        <div className="absolute right-0 mt-2 w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden z-50">
          <ul className="divide-y divide-gray-200">
            {searchResults.map((event) => (
              <li
                key={event._id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleEventClick(event._id)}
              >
                {event.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
