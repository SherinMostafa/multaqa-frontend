import React, { useState, useEffect, useRef } from 'react';
import { MdFavorite, MdFavoriteBorder, MdOutlineMoreHoriz } from "react-icons/md";
import Button from '../Components/Button';
import Report from '../Sections/Report';

const Feedback = ({ rating, isSaved, onSaveChange }) => {
  const [saved, setSaved] = useState(isSaved);
  const [showReportForm, setShowReportForm] = useState(false);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const toggleSaved = () => {
    const newSaved = !saved;
    setSaved(newSaved);
    onSaveChange(newSaved);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`text-sm ${i <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
      >
        ★
      </span>
    );
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleReportEvent = () => {
    setShowReportForm(true);
    setIsDropdownOpen(false);
  };

  const handleCloseReportForm = () => {
    setShowReportForm(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="flex items-center justify-between rounded-md mt-6">
      <div className="flex items-center">
        {stars}
      </div>
      <div className="flex justify-between items-center">
        {saved ? (
          <MdFavorite
            className="text-[#6F1A07] cursor-pointer transition duration-300 hover:text-[#A8763E] mr-4"
            onClick={toggleSaved}
            fontSize='medium'
          />
        ) : (
          <MdFavoriteBorder
            className="text-[#6F1A07] cursor-pointer transition duration-300 hover:text-[#A8763E] mr-4"
            onClick={toggleSaved}
            fontSize='medium'
          />
        )}
        <div className='relative' ref={dropdownRef}>
          <MdOutlineMoreHoriz
            className="text-[#6F1A07] cursor-pointer transition duration-300 hover:text-[#A8763E]"
            fontSize='large'
            onClick={handleToggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div className="px-4 py-2 text-sm" role="none">
                <Button
                  label={"Report this event"}
                  link={true}
                  role="menuitem"
                  onClick={handleReportEvent}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {showReportForm && <Report onSubmit={() => {}} onClose={handleCloseReportForm} />}
    </div>
  );
};

export default Feedback;
