import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../Sections/Cards'; // Assuming the Cards component is in the correct directory

const Likes = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [userId, setUserId] = useState('');

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
    }
  }, [userId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-16">Saved Events</h2>
      <div className="gap-4 max-w-5xl flex-col mx-auto">
        {savedEvents.length > 0 ? (
          savedEvents.map(savedEvent => (
            <Cards key={savedEvent._id} horizontal={true} events={[savedEvent]} />
          ))
        ) : (
          <p>No saved events found.</p>
        )}
      </div>
    </div>
  );
};

export default Likes;
