import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Company = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        const eventDetails = await Promise.all(
          response.data.map(async (event) => {
            const eventRevenueResponse = await axios.get(`http://localhost:5000/eventRevenue/${event._id}`);
            return eventRevenueResponse.data;
          })
        );
        setEvents(eventDetails);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex-1 pl-2 pt-4 lg:px-10">
      <h1 className="text-2xl font-bold text-center">Event Revenues</h1>
      <div className="py-8">
        {events.map((event) => (
          <div key={event._id} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-8 mb-4 w-full md:w-3/4 mx-auto">
            <div className="flex-auto">
              <div className="flex justify-between mb-4">
                <div className="flex gap-4">
                  <div className="font-semibold">Title:</div>
                  <div>{event.title}</div>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="flex gap-4">
                  <div className="font-semibold">Date:</div>
                  <div>{new Date(event.date).toLocaleString()}</div>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="flex gap-4">
                  <div className="font-semibold">Revenue:</div>
                  <div>{event.websiteRevenue}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Company;
