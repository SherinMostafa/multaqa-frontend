import React, { useState } from 'react';
import Button from '../Components/Button'; // Import the Button component
import { categories, events } from '../Constants/index'
import Cards from '../Sections/Cards';
// import axios from 'axios';
// import { events } from '../Constants/database';

const Events = () => {
  // const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   axios.get('')
  //   .then((response) => {
  //     setEvents(response.data.events) 
  //   })
  // }, [])
  
  // Define state for filter options
  const [filter, setFilter] = useState('');

  // Function to handle filter change
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  // Filter events based on selected category
  const filteredEvents = filter ? events.filter(event => event.category === filter) : events;

  return (
    <div className="container mx-auto py-8 flex mt-6">
      {/* Filter */}
      <div className="w-1/4 px-4">
        <div className="mb-4">
          <label htmlFor="filter" className="block text-sm font-medium text-[#2B2118]">Filter by Category:</label>
          <div className="mt-1">
            <Button label={filter ? filter : 'All Categories'} dropdown={true} dropdownOptions={categories} onSelect={handleFilterChange} />
          </div>
        </div>
      </div>

      {/* Events list */}
      <div className="w-3/4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <Cards events={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
