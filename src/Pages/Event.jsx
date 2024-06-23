import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Tickets from '../Sections/Tickets';
import Button from '../Components/Button';
import BarLoader from 'react-spinners/BarLoader';
import Cards from '../Sections/Cards';
import Follow from '../Sections/Follow';

const Event = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events'); // Adjust URL as per your backend endpoint
      const filteredEvents = response.data.filter(event => event.availableTickets);
      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Error fetching event details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const goBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[359px]">
        <BarLoader color="#6F1A07" height={6} width={178} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto text-center flex flex-col gap-y-[55px] mt-16 mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mt-8 md:mt-12 mb-4 md:mb-6 text-[#6F1A07]">{error}</h2>
        <Button
          type={'button'}
          onClick={goBack}
          customStyle={'px-6 py-4 text-lg'}
          label={'Go Back'}
        />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto text-center flex flex-col gap-y-[55px] mt-16 mb-20">
        <h2 className='text-3xl md:text-4xl font-bold mt-8 md:mt-12 mb-4 md:mb-6 text-[#6F1A07]'>Event not found</h2>
        <Button
          type={'button'}
          onClick={goBack}
          customStyle={'px-6 py-4 text-lg'}
          label={'Go Back'}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-10 container mx-auto px-4 mb-20">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">
          <img
            src={`${event.image}`}
            alt="Event"
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="flex flex-col lg:flex-row justify-between mt-8 md:mt-12">
            <div className="w-full lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[#6F1A07]">{event.title}</h2>
              <p className="text-[#2B2118] leading-relaxed mb-6">{event.description}</p>
              <p className="text-[#2B2118] text-lg font-semibold mb-2">Date and Time:</p>
              <p className="text-[#2B2118] mb-6">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - {event.time}</p>
              {event.location ? (
                <>
                  <p className="text-[#2B2118] text-lg font-semibold mb-2">Location:</p>
                  <p className="text-[#2B2118] mb-6">{event.location}</p>
                </>
              ) : (
                <>
                  <p className="text-[#2B2118] text-lg font-semibold mb-2">Online Link:</p>
                  <p className="text-[#2B2118] mb-6">{event.onlineUrl}</p>
                </>
              )}
            </div>
            <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
              <Tickets eventId={eventId} availableTickets={event.availableTickets} />
            </div>
          </div>

          {/* Render Follow Component */}
          <div className="mt-8">
            <Follow userId={event.user_id} />
          </div>
        </div>
      </div>
      <div className='bg-[#ECF0F1]'>
        <div className="container pt-10 sm:pt-20 mx-auto">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#2B2118] font-bold mx-4 mb-6 md:mb-10">Suggested Events</h1>
          <div>
            <Cards withSlider={true} events={events} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
