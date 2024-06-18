import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Components/Button';
import Input from '../Components/Input';

const Ticket = () => {
  const [ticketData, setTicketData] = useState({
    title: '',
    price: 0,
    start_date: '',
    end_date: '',
    number_of_tickets: '',
    eventId: '',
  });

  useEffect(() => {
    const eventId = localStorage.getItem('eventId');
    if (eventId) {
      setTicketData((prevTicketData) => ({
        ...prevTicketData,
        eventId: eventId,
      }));
    } else {
      alert('Event ID not found in local storage');
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTicketData((prevTicketData) => ({
      ...prevTicketData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userId = JSON.parse(localStorage.getItem('user'))?._id;
      if (!userId) {
        throw new Error('userId not found in localStorage');
      }
  
      // Parse number_of_tickets to ensure it's a valid integer
      const numberOfTickets = parseInt(ticketData.number_of_tickets);
      if (isNaN(numberOfTickets) || numberOfTickets <= 0) {
        throw new Error('Number of tickets must be a valid positive number');
      }
  
      const response = await axios.post('http://localhost:5000/tickets', {
        ...ticketData,
        userId: userId,
        number_of_tickets: numberOfTickets, // Ensure number_of_tickets is sent as a number
      });
  
      if (response.status === 201) {
        alert('Ticket created successfully');
  
        // Update event with availableTickets
        const eventId = ticketData.eventId;
  
        if (eventId) {
          const eventUpdateResponse = await axios.patch(`http://localhost:5000/event/${eventId}`, {
            availableTickets: numberOfTickets,
          });
  
          if (eventUpdateResponse.status === 200) {
            alert('Event updated with available tickets successfully');
          } else {
            throw new Error('Failed to update event with available tickets');
          }
        } else {
          throw new Error('Event ID is invalid');
        }
  
        // Additional logic after successful ticket creation
      } else {
        throw new Error('Failed to create ticket');
      }
    } catch (error) {
      console.error('Error creating ticket:', error.response?.data || error.message);
      alert('Failed to create ticket. Please check console for details.');
    }
  };
  
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="container mx-auto px-4 mt-4 mb-20">
      <Button
        type="button"
        label="Go Back"
        onClick={goBack}
        link={true}
        customStyle={'p-4'}
      />
      <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-md mx-auto my-5 p-12 mt-10 md:max-w-4xl">
        <h2 className="text-4xl font-bold mb-14 text-[#6F1A07] text-center">Create Ticket</h2>
        <form onSubmit={handleSubmit}>
          <Input
            id="title"
            type="text"
            label="Ticket Title"
            name="title"
            value={ticketData.title}
            onChange={handleInputChange}
          />
          <label className="block text-gray-700 font-semibold mb-2">Price</label>
          <input
            id="price"
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-[#6F1A07]"
            value={ticketData.price}
            onChange={handleInputChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              id="start_date"
              type="date"
              label="Start Date"
              name="start_date"
              value={ticketData.start_date}
              onChange={handleInputChange}
            />
            <Input
              id="end_date"
              type="date"
              label="End Date"
              name="end_date"
              value={ticketData.end_date}
              onChange={handleInputChange}
            />
          </div>
          <Input
            id="number_of_tickets"
            type="number"
            label="Number of Tickets"
            name="number_of_tickets"
            value={ticketData.number_of_tickets}
            onChange={handleInputChange}
          />
          <Button
            form={true}
            type="submit"
            label="Create Ticket"
            customStyle={'w-full sm:w-3/4 md:w-1/2 p-4 mt-8 flex justify-center mx-auto'}
          />
        </form>
      </div>
    </div>
  );
};

export default Ticket;
