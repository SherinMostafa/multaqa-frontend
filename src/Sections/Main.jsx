import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Components/Button';
import Cards from '../Sections/Cards'; // Assuming Cards component path

const Main = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/creator/${user._id}`);
        console.log(response.data);
        setEvents(response.data);
        setIsLoading(false); // Set loading state to false when data is fetched
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error);
        setIsLoading(false); // Ensure loading state is set to false on error
      }
    };

    fetchEvents();
  }, [user._id]);

  return (
    <div className="flex-1 pl-2 pt-4 lg:p-10 min-h-96">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-[#6F1A07]">Welcome, {user.fname} {user.lname}</h1>
      <hr className='my-4 w-full border-gray-300' />
      <section className="mb-8 space-y-4">
        {isLoading ? (
          <div>Loading...</div> // Display loading indicator while fetching data
        ) : (
          events.length > 0 ? (
            events.map(event => (
                <Cards key={event._id} horizontalOrganizer={true} events={event} />
            ))
          ) : (
            <div className="max-w-md gap-6 mb-8">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Start Create Event</h2>
                <p className='mb-6 text-sm'>Add all your event details, create new tickets and set up recurring events</p>
                <Button type="button" linkURL={'/Create'} label="Create Event" customStyle="px-8 py-4 text-[18px] font-bold flex justify-center" />
              </div> 
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default Main;
