import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../Sections/Cards'; // Assuming the Cards component is in the correct directory

const Likes = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [userId, setUserId] = useState('');

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    // Fetch user_id from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user')); // Assuming user object is stored as JSON string
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // Fetch saved events from backend
      const fetchSavedEvents = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/attendee/saveEvent/${userId}`);
          setSavedEvents(response.data.savedEvents); // Access savedEvents directly from the response
        } catch (error) {
          console.error('Error fetching saved events:', error);
        }
      };

      fetchSavedEvents();

      // Fetch booked tickets from backend
      const fetchBookedTickets = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/attendee/booked-tickets/${userId}`);
          setBookedTickets(response.data.bookedTickets); // Access bookedTickets directly from the response
        } catch (error) {
          console.error('Error fetching booked tickets:', error);
        }
      };

      fetchBookedTickets();
    }
  }, [userId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-16 text-[#2B2118]">Saved Events</h2>
      <div className="grid grid-cols-1 gap-8">
        {savedEvents.length > 0 ? (
          savedEvents.map(savedEvent => (
            <Cards key={savedEvent._id} horizontal={true} events={[savedEvent]} />
          ))
        ) : (
          <p className="text-lg">No saved events found.</p>
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        {bookedTickets.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-8 text-[#2B2118]">Booked Tickets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bookedTickets.map(ticket => (
                <div key={ticket._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="py-4 px-6 text-white bg-gradient-to-r from-[#A8763E] to-[#a8773ec5] shadow-md">
                    <h4 className="text-2xl mb-4 font-semibold">{ticket.eventId.title}</h4>
                    <p className="text-sm font-semibold">{formatDate(ticket.eventId.date)}</p>
                  </div>
                  <div className="px-6 py-4 flex justify-between">
                    <p className="text-sm text-gray-700 font-semibold">Time: {ticket.eventId.time}</p>
                    <p className="text-sm text-gray-700 font-semibold">EGP {ticket.eventId.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {bookedTickets.length === 0 && (
          <p className="text-lg mt-8">No booked tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default Likes;
