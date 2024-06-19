import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Landing from '../Sections/Landing';
import Cards from '../Sections/Cards';
import Categories from '../Sections/Categories';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events'); // Adjust URL as per your backend endpoint
      // Filter events that have availableTickets value
      const filteredEvents = response.data.filter(event => event.availableTickets);
      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Handle error state if needed
    }
  };

  return (
    <>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-6'>
        <Landing />
      </div>

      <div className="container mx-auto py-10 sm:py-20">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#2B2118] font-bold mx-4 mb-6 md:mb-10">Suggested Events</h1>
        <div>
          <Cards withSlider={true} events={events} />
        </div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <Categories />
      </div>
    </>
  );
}

export default Home;
