import React, { useState, useRef } from 'react';
import { MdFavorite, MdFavoriteBorder, MdOutlineMoreHoriz } from "react-icons/md";
import Button from '../Components/Button';
import Report from '../Sections/Report';

const Feedback = ({ rating, isSaved, onSaveChange, onReport, eventId }) => {
    const [saved, setSaved] = useState(isSaved);
    const [showReportForm, setShowReportForm] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleSaved = () => {
        const newSaved = !saved;
        setSaved(newSaved);
        onSaveChange(newSaved);
    };

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleReportEvent = () => {
        onReport(); // This triggers the opening of Report form
        setIsDropdownOpen(false);
    };

    const handleReportClose = () => {
        setShowReportForm(false);
    };

    return (
        <div className="flex items-center justify-between rounded-md mt-6">
            <div className="flex items-center">
                {/* Render star rating */}
                {Array.from({ length: 5 }, (_, index) => (
                    <span
                        key={index}
                        className={`text-sm ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}
                    >
                        ★
                    </span>
                ))}
            </div>
            <div className="flex justify-between items-center">
                {/* Toggle saved icon */}
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
                    {/* Dropdown for report */}
                    <MdOutlineMoreHoriz
                        className="text-[#6F1A07] cursor-pointer transition duration-300 hover:text-[#A8763E]"
                        fontSize='large'
                        onClick={handleToggleDropdown}
                    />
                    {/* Report form */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <div className="px-4 py-2 text-sm" role="none">
                                <Button
                                    label="Report this event"
                                    link={true}
                                    role="menuitem"
                                    onClick={handleReportEvent}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Modal for reporting */}
            {showReportForm && (
                <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md w-full max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Report Event</h2>
                        <Report
                            onSubmit={(data) => {
                                // Handle submission success if needed
                                console.log('Report submitted successfully:', data);
                                alert('Report submitted successfully');
                                setShowReportForm(false);
                            }}
                            onClose={handleReportClose}
                            eventId={eventId}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Feedback;
