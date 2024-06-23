import React, { useState, useEffect, useRef } from 'react';
import { MdFavorite, MdFavoriteBorder, MdOutlineMoreHoriz } from "react-icons/md";
import Button from '../Components/Button';
import Report from '../Sections/Report';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Feedback = ({ isSaved, onSaveChange, onReport, eventId }) => {
    const [user, setUser] = useState(null);
    const [saved, setSaved] = useState(isSaved);
    const [showReportForm, setShowReportForm] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    // State to manage saved events in local storage
    const [savedEvents, setSavedEvents] = useState(() => {
        const storedEvents = JSON.parse(localStorage.getItem('savedEvents')) || [];
        return storedEvents;
    });

    useEffect(() => {
        // Load user object from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    useEffect(() => {
        // Check if current event is saved
        setSaved(savedEvents.includes(eventId));
    }, [savedEvents, eventId]);

    const handleSaveEvent = async (newSaved) => {
        if (!user || !user._id) {
            console.error('User ID not found in user object');
            alert('Please login to your account.');
            // navigate('/Login');
        }

        try {
            const requestData = {
                user_id: user._id,
                event_id: eventId
            };

            let response;

            if (newSaved) {
                // Save event
                response = await axios.post('http://localhost:5000/attendee/saveEvent', requestData);
                if (response.status === 200) {
                    console.log('Event saved successfully:', response.data);
                    setSaved(true); // Update saved state after successful save
                    setSavedEvents([...savedEvents, eventId]); // Update local saved events
                    onSaveChange(true); // Update parent component's state
                } else {
                    console.error('Error saving event:', response.data.error);
                }
            } else {
                // Unsave event
                response = await axios.delete('http://localhost:5000/attendee/saveEvent', {
                    data: requestData
                });
                if (response.status === 200) {
                    console.log('Event unsaved successfully:', response.data);
                    setSaved(false); // Update saved state after successful unsave
                    setSavedEvents(savedEvents.filter(id => id !== eventId)); // Update local saved events
                    onSaveChange(false); // Update parent component's state
                } else {
                    console.error('Error unsaving event:', response.data.error);
                }
            }
        } catch (error) {
            console.error('Error handling save/unsave event:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }
    };

    const toggleSaved = async () => {
        const newSaved = !saved;
        await handleSaveEvent(newSaved);
    };

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleReportEvent = () => {
        if (!user || !user._id) {
            console.error('User ID not found in user object');
            navigate('/Login');
            alert('Please login to your account.');
            setIsDropdownOpen(false);
        }
        else {
            onReport();
        }
    };

    const handleReportClose = () => {
        setShowReportForm(false);
    };

    // Update local storage when savedEvents state changes
    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    }, [savedEvents]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownRef]);

    const userType = localStorage.getItem('userType');

    // Conditionally render the Feedback component based on userType
    if (userType === 'Organizer') {
        return null; // Hide the component if userType is Organizer
    }

    return (
        <div className="flex items-center justify-between rounded-md mt-6">
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
            </div>
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
                                    label="Report this event"
                                    link={true}
                                    role="menuitem"
                                    onClick={handleReportEvent}
                                />
                            </div>
                        </div>
                    )}
                </div>
            {showReportForm && (
                <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md w-full max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Report Event</h2>
                        <Report
                            onSubmit={(data) => {
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
