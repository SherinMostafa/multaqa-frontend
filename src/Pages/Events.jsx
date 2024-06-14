import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Components/Button';
import Cards from '../Sections/Cards';
import { categories } from '../Constants/index';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    const filteredEvents = filter ? events.filter(event => event.category_id === filter) : events;

    return (
        <div className="container mx-auto py-8 flex mt-6">
            <div className="w-1/4 px-4">
                <div className="mb-4">
                    <label htmlFor="filter" className="block text-sm font-medium text-[#2B2118]">Filter by Category:</label>
                    <div className="mt-1">
                        <Button label={filter ? filter : 'All Categories'} dropdown={true} dropdownOptions={categories} onSelect={handleFilterChange} />
                    </div>
                </div>
            </div>

            <div className="w-3/4 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map(event => (
                      <Cards key={event._id} events={event} horizontal={false} withSlider={false} />
                  ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
