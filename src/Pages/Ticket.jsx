import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { useNavigate } from 'react-router-dom';

const Ticket = () => {
  const navigate = useNavigate();

  const [ticketData, setTicketData] = useState({
    title: '',
    price: '',
    start_date: '',
    end_date: '',
    number_of_tickets: '',
    eventId: '',
  });

  const [price, setPrice] = useState('paid'); // Default to 'paid', assuming 'paid' is the default option

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

    // Validate number_of_tickets input to accept positive integers only
    if (id === 'number_of_tickets' && value !== '') {
      const intValue = parseInt(value);
      if (isNaN(intValue) || intValue <= 0) {
        alert('Number of tickets must be a valid positive number');
        return;
      }
    }

    // Validate price input to accept non-negative numbers
    if (id === 'price' && value !== '') {
      const floatValue = parseFloat(value);
      if (isNaN(floatValue) || floatValue < 0) {
        alert('Price must be a valid non-negative number');
        return;
      }
    }

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

      const numberOfTickets = parseInt(ticketData.number_of_tickets);
      if (isNaN(numberOfTickets) || numberOfTickets <= 0) {
        throw new Error('Number of tickets must be a valid positive number');
      }

      const response = await axios.post('http://localhost:5000/tickets', {
        ...ticketData,
        userId: userId,
        number_of_tickets: numberOfTickets,
      });

      if (response.status === 201) {
        
        // Update event with availableTickets
        const eventId = ticketData.eventId;
        
        if (eventId) {
          const eventUpdateResponse = await axios.patch(`http://localhost:5000/event/${eventId}`, {
            availableTickets: numberOfTickets,
          });
          
          if (eventUpdateResponse.status === 200) {
            console.log('Event updated with available tickets successfully');
          } else {
            throw new Error('Failed to update event with available tickets');
          }
        } else {
          throw new Error('Event ID is invalid');
        }
        
        alert('Ticket created successfully');
        navigate(`/Event/${eventId}`);
        
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

  const handlePriceChange = (type) => {
    setPrice(type);
    if (type === 'paid') {
      setTicketData((prevTicketData) => ({
        ...prevTicketData,
        price: '', // Reset price if switching to 'paid'
        free: 0, // Clear free if switching to 'paid'
      }));
    } else {
      setTicketData((prevTicketData) => ({
        ...prevTicketData,
        price: 0, // Set price to 0 if switching to 'free'
        free: 0, // Clear free if switching to 'free'
      }));
    }
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
          <div className="mb-4 mt-10">
            <div className="flex gap-6 mb-6">
              <Button
                type="button"
                label="Paid"
                onClick={() => handlePriceChange('paid')}
                customStyle={price === 'paid' ? 'px-6 py-2 bg-[#A8763E] border-[#A8763E] rounded-full' : 'px-6 py-2 rounded-full'}
              />
              <Button
                type="button"
                label="Free"
                onClick={() => handlePriceChange('free')}
                customStyle={price === 'free' ? 'px-6 py-2 bg-[#A8763E] border-[#A8763E] rounded-full' : 'px-6 py-2 rounded-full'}
              />
            </div>
          </div>
          {price === 'paid' && (
            <Input
              id="price"
              type="number"
              label="Price"
              name="price"
              customStyle={'mb-10'}
              value={ticketData.price}
              onChange={handleInputChange}
            />
          )}
          {price === 'free' && (
            <Input
              id="price"
              type="number"
              label="Price"
              name="price"
              customStyle={'mb-10 bg-gray-50 border-gray-50 cursor-not-allowed'}
              value={ticketData.price}
              disabled={true}
              onChange={handleInputChange}
            />
          )}
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
