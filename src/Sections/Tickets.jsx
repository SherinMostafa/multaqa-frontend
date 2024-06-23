import React, { useState, useEffect } from 'react';
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';

const Tickets = ({ eventId, availableTickets }) => {
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState('');
  const [ticketData, setTicketData] = useState({ title: '', price: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tickets/${eventId}/titles`);
        const ticketDetails = response.data;
        
        if (ticketDetails) {
          setTicketData({
            title: ticketDetails.title,
            price: ticketDetails.price,
          });
        } else {
          setTicketData({
            title: 'No tickets available',
            price: 0,
          });
        }
      } catch (error) {
        console.error('Error fetching ticket details:', error);
        setError('Error fetching ticket details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [eventId]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= availableTickets) {
      setQuantity(newQuantity);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < availableTickets && quantity < 5) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleProceedToCheckout = () => {
    if (quantity > 0) {
      navigate('/Checkout', {
        state: {
          eventId,
          quantity,
          price: ticketData.price,
          title: ticketData.title
        }
      });
    } else {
      alert('Please select at least one ticket to proceed to checkout.');
    }
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const userType = localStorage.getItem('userType');

  // Conditionally render the Feedback component based on userType
  if (userType === 'Organizer') {
      return null; // Hide the component if userType is Organizer
  }

  return (
    <div className="max-w-3xl mx-auto bg-white border border-[#6F1A07] shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col space-y-8 justify-between items-center mb-4">
          <h2 className="text-[#6F1A07] text-3xl font-bold">{ticketData.title}</h2>
          <h2 className="text-[#6F1A07] text-xl font-bold">EGP {ticketData.price}</h2>
          <div className="flex items-center">
            <div onClick={handleDecreaseQuantity} className="cursor-pointer">
              <FaSquareMinus color='#6F1A07' size={34} />
            </div>
            <Input
              id="quantity"
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              customStyle="w-40 p-2 text-center border-none"
              disabled={true}
            />
            <div onClick={handleIncreaseQuantity} className="cursor-pointer">
              <FaSquarePlus color='#6F1A07' size={34} />
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
