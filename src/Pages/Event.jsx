// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const Event = () => {
//   const { eventId } = useParams(); // Get the eventId from the URL params
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     // Here you can fetch event details from your backend based on the eventId
//     // For demonstration purposes, let's assume you have a function to fetch event details
//     const fetchEventDetails = async () => {
//       try {
//         // Make a request to fetch event details by eventId
//         const response = await fetch(`/api/events/${eventId}`); // Replace with your actual endpoint
//         if (response.ok) {
//           const eventData = await response.json();
//           setEvent(eventData); // Set the event data in state
//         } else {
//           // Handle error if request fails
//           console.error('Failed to fetch event details');
//         }
//       } catch (error) {
//         console.error('Error fetching event details:', error);
//       }
//     };

//     fetchEventDetails(); // Call the function to fetch event details
//   }, [eventId]);

//   if (!event) {
//     // If event data is not yet available, display loading indicator or message
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="event-container">
//       <h2>{event.title}</h2>
//       <p>{event.description}</p>
//       <p>Date: {event.date}</p>
//       <p>Price: {event.price}</p>
//       <img src={event.imageURL} alt="Event" />
//       {/* Add any other event details you want to display */}
//     </div>
//   );
// };

// export default Event;

import React from 'react';
import Tickets from '../Sections/Tickets';
import Cards from '../Sections/Cards';
import Button from '../Components/Button';
import { events } from '../Constants/index';

const Event = ({ event }) => {
  if (!event) {
    return ( 
      <div className='min-h-[46vh] flex flex-col justify-center items-center'>
        <div className="text-4xl font-semibold font-mono text-[#6F1A07] mb-8">
          Event not found
        </div>
        <Button label={'Back to events'} linkURL={'/Events'} customStyle={'px-6 py-4'} />
      </div>
    );
  } else {
    return (
      <div className="mt-10 container mx-auto px-4">
        <div className="shadow-[#ECF0F1] shadow-lg rounded-lg p-6 md:p-10">
          <img 
            src={event.imageURL} 
            alt="Event" 
            className="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        <h2 className="text-3xl md:text-4xl font-bold mt-10 mb-8 md:mb-14 text-[#6F1A07]">{event.title}</h2>
          <div className='flex flex-col lg:flex-row justify-between mt-16'>
            <div className="w-full lg:w-2/3 flex flex-col space-y-8">
              <p className="text-[#2B2118] mb-8">{event.description}</p>
              <p className="text-[#2B2118] text-2xl font-bold mb-2 md:mb-0">Date and Time : <span className="font-semibold text-lg">{event.date} - {event.time}</span></p>
              <p className="text-[#2B2118] md:mb-0">Location : <span className="font-semibold">{event.location}</span></p>
              {/* <Button label={'Report this event'} link={true} /> */}
            </div>
            <div className='w-full lg:w-1/3 mt-20 lg:mt-0'>
              <Tickets ticket={event.ticket} />
            </div>
          </div>
        </div>
        <h2 className='text-3xl md:text-4xl font-bold mb-8 md:mb-14 mt-20 text-[#6F1A07]'>Other events you may like</h2>
        <div>
          <Cards withSlider={true} events={events} />
        </div>
      </div>
    );
  }
};

export default Event;
