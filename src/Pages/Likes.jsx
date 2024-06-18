import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming Axios is installed

const Likes = () => {
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    // Fetch saved events from the backend or an API
    const fetchSavedEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/saved-events'); // Replace with your API endpoint
        setSavedEvents(response.data); // Assuming response.data contains an array of saved events
      } catch (error) {
        console.error('Error fetching saved events:', error);
      }
    };

    fetchSavedEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Saved Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedEvents.map((event) => (
          <div key={event.id} className="border rounded-md p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
            {/* Additional event details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Likes;
