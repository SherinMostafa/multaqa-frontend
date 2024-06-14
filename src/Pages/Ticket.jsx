import React, { useState } from 'react';
import axios from 'axios';
import Button from '../Components/Button';
import Input from '../Components/Input';

const Ticket = ({ eventId }) => {
  const [ticketData, setTicketData] = useState({
    title: '',
    priceType: 'Free',
    price: 0,
    startDate: '',
    endDate: '',
    numberOfTickets: '',
    eventId: eventId, // Ensure eventId is included in the initial state
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTicketData((prevTicketData) => ({
      ...prevTicketData,
      [id]: value,
    }));
  };

  const handlePriceTypeChange = (type) => {
    setTicketData((prevTicketData) => ({
      ...prevTicketData,
      priceType: type,
      price: type === 'Free' ? 0 : '', // Reset price if "Free" is selected
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/tickets', {
        ...ticketData,
        eventId: eventId, // Ensure eventId is included in the request body
        price: ticketData.priceType === 'Free' ? 0 : ticketData.price,
      });
      if (response.status === 201) {
        alert('Ticket created successfully');
        setTicketData({
          title: '',
          priceType: 'Free',
          price: 0,
          startDate: '',
          endDate: '',
          numberOfTickets: '',
          eventId: eventId, // Ensure eventId is reset after creating ticket
        });
      } else {
        throw new Error(response.data || 'Failed to create ticket');
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

          <div className="mb-4 mt-10">
            <div className="flex gap-6 mb-6">
              <Button
                type="button"
                label="Free"
                onClick={() => handlePriceTypeChange('Free')}
                customStyle={ticketData.priceType === 'Free' ? 'px-8 py-2 bg-[#A8763E] text-white border-[#A8763E] rounded-full' : 'px-8 py-2 border-[#A8763E] rounded-full'}
              />
              <Button
                type="button"
                label="Paid"
                onClick={() => handlePriceTypeChange('Paid')}
                customStyle={ticketData.priceType === 'Paid' ? 'px-8 py-2 bg-[#A8763E] text-white border-[#A8763E] rounded-full' : 'px-8 py-2 border-[#A8763E] rounded-full'}
              />
            </div>
          </div>

          <label className="block text-gray-700 font-semibold mb-2">Price</label>

          <div className={`relative ${ticketData.priceType === 'Free' ? 'cursor-not-allowed' : ''}`}>
            <input
              id="price"
              type="number"
              className={`appearance-none rounded-md block w-full py-3 px-4 leading-tight focus:outline-none ${ticketData.priceType === 'Free' ? 'bg-gray-300 text-gray-600' : ''}`}
              value={ticketData.priceType === 'Free' ? 0 : ticketData.price}
              onChange={handleInputChange}
              disabled={ticketData.priceType === 'Free'}
            />
            {ticketData.priceType === 'Free' && (
              <div className="absolute inset-0 bg-gray-300 opacity-50 cursor-not-allowed" />
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="startDate"
              type="date"
              label="Start Date"
              name="startDate"
              value={ticketData.startDate}
              onChange={handleInputChange}
            />
            <Input
              id="endDate"
              type="date"
              label="End Date"
              name="endDate"
              value={ticketData.endDate}
              onChange={handleInputChange}
            />
          </div>
          <Input
            id="numberOfTickets"
            type="number"
            label="Number of Tickets"
            name="numberOfTickets"
            value={ticketData.numberOfTickets}
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
