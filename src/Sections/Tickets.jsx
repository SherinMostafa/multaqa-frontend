import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import axios from 'axios';

const Tickets = ({ eventId }) => {
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState('');
  const [availableTickets, setAvailableTickets] = useState(0);
  const [ticketTitle, setTicketTitle] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${eventId}`);
        const eventData = response.data;
        setAvailableTickets(eventData.availableTickets);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Error fetching event details. Please try again later.');
      }
    };

    const fetchTicketTitle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tickets/${eventId}/titles`);
        const titleData = response.data[0]; // Assuming only one title is returned
        if (titleData) {
          setTicketTitle(titleData.title);
        } else {
          setTicketTitle('No tickets available');
        }
      } catch (error) {
        console.error('Error fetching ticket title:', error);
        setError('Error fetching ticket title. Please try again later.');
      }
    };

    fetchEventDetails();
    fetchTicketTitle();
  }, [eventId]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleIncreaseQuantity = () => {
    if (quantity < availableTickets) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleProceedToCheckout = () => {
    console.log(`Proceeding to checkout with ${quantity} ticket(s)`);
    // Implement checkout logic as needed
  };

  if (error) {
    return <div>No Tickets Available</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white border border-[#6F1A07] shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col space-y-8 justify-between items-center mb-4">
          <label htmlFor="quantity" className="text-[#2B2118] text-xl font-bold">{ticketTitle}</label>
          <div className='flex items-center gap-x-6'>
            <p className="font-semibold text-[#2B2118]">Available Tickets</p>
            <p className='font-semibold text-lg text-[#A8763E] '>{availableTickets}</p>
          </div>
          <div className="flex items-center">
            <div onClick={handleDecreaseQuantity}>
              <Button label={'-'} customStyle={'px-3 py-1 font-semibold text-[26px] leading-8'} />
            </div>
            <input
              id="quantity"
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-40 p-2 text-center bg-white"
              disabled
            />
            <div onClick={handleIncreaseQuantity}>
              <Button label={'+'} customStyle={'px-3 py-1 font-semibold text-xl leading-8'} />
            </div>
          </div>
        </div>
        <div onClick={handleProceedToCheckout}>
          <Button label={'Get Tickets'} customStyle={'w-full py-3 font-semibold text-[18px] leading-[32px]'} />
        </div>
      </div>
    </div>
  );
};

export default Tickets;
