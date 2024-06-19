import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../Sections/Cards';
import Input from '../Components/Input';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events');
      const eventsData = response.data.filter(event => event.availableTickets); // Filter events with available tickets
      setEvents(eventsData);
      setLoading(false); // Set loading to false after fetching events
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false); // Set loading to false on error
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredEvents = filter
    ? events.filter(event => event.category_id === filter)
    : events;

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex my-36">
        Loading ...
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 flex mt-6">
      <div className="w-1/4 px-4">
        <Input
          id="categoryFilter"
          name="category_id"
          label="Filter by Category:"
          type="select"
          customStyle={'border-none'}
          value={filter}
          onChange={handleFilterChange}
          selectOptions={[
            { value: '', label: 'All Categories' },
            ...categories.map(category => ({
              value: category._id,
              label: category.title
            }))
          ]}
        />
      </div>

      <div className="w-3/4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <Cards key={event._id} events={event} horizontal={false} withSlider={false} />
            ))
          ) : (
            <div className="container text-center flex flex-col items-center gap-y-8 mb-[91px]">
              <h2 className='text-2xl md:text-3xl font-bold mt-8 md:mt-12 mb-4 md:mb-6 text-[#6F1A07]'>No events found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
