import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Tickets from '../Sections/Tickets';

const Event = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Error fetching event. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const renderEventImage = (imageData) => {
    if (typeof imageData === 'string' && imageData.startsWith('/9j/')) {
      return <img src={`data:image/jpeg;base64,${imageData}`} alt="Event" className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg" />;
    } else {
      return (
        <div className="w-full h-64 md:h-96 bg-gray-300 flex items-center justify-center rounded-lg shadow-lg">
          Image not available
        </div>
      );
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return <div className="mt-10 container mx-auto text-center">Loading...</div>;
  }

  if (error) {
    return <div className="mt-10 container mx-auto text-center">Error: {error}</div>;
  }

  if (!event) {
    return <div className="mt-10 container mx-auto text-center">Event not found</div>;
  }

  return (
    <div className="mt-10 container mx-auto px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">
        {renderEventImage(event.image)}
        <h2 className="text-3xl md:text-4xl font-bold mt-8 md:mt-12 mb-4 md:mb-6 text-[#6F1A07]">{event.title}</h2>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="w-full lg:w-2/3 flex flex-col space-y-6 lg:pr-10">
            <p className="text-[#2B2118] leading-relaxed mb-6">{event.description}</p>
            <p className="text-[#2B2118] text-lg font-semibold mb-2">Date and Time:</p>
            <p className="text-[#2B2118] mb-6">{formatDate(event.date)} - {event.time}</p>
            <p className="text-[#2B2118] text-lg font-semibold mb-2">Location:</p>
            <p className="text-[#2B2118] mb-6">{event.location}</p>
          </div>
          <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
            <Tickets availableTickets={event.availableTickets} ticketsTitle="Tickets Title" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
