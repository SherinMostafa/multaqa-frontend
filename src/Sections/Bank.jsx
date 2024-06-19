import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import axios from 'axios';
import { FcSimCardChip } from 'react-icons/fc';

const Bank = () => {
  const [card, setCard] = useState(null); // State to hold the user's card

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.bankAccount) {
      fetchCard(storedUser.bankAccount);
    }
  }, []);

  const fetchCard = async (bankAccount) => {
    try {
      const response = await axios.get(`http://localhost:5000/bankAccount/${bankAccount}`);
      setCard(response.data); // Assuming the response.data is the card object
    } catch (error) {
      console.error('Error fetching card:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      // Handle error fetching card
      // Example: set an error state to display to the user
      // or provide a fallback message
    }
  };

  const renderCardDetails = () => {
    if (!card) {
      return <p>You currently don't have any debit or credit cards saved.</p>;
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Card Front */}
          <div className="px-8 py-6 bg-gradient-to-br from-gray-600 to-gray-900 text-white">
            <div className="flex justify-between mb-6">
              <div className="text-xl font-bold">Credit Card</div>
              <FcSimCardChip size={40} className="text-white" />
            </div>
            <div className="text-lg text-gray-200 mb-4 text-center">
              {card.cardNumber}
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <div className="text-sm text-gray-300">Card Holder</div>
                <div className="text-lg font-semibold">{card.cardHolderName}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-300">Expires</div>
                <div className="text-lg font-semibold">{card.expireDate}</div>
              </div>
            </div>
          </div>
          
          {/* Card Back (CVV) */}
          <div className="px-8 py-6 bg-gray-600 text-white">
            <div className="flex justify-end">
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-300">CVV</div>
                <div className="text-lg font-semibold">{card.cvv}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleAddNewCard = () => {
    // Placeholder function for adding a new card
    console.log('Add New Card clicked');
  };

  return (
    <form className="flex-1 pl-2 pt-4 lg:p-10">
      <h1 className="text-2xl font-bold mb-6 text-[#6F1A07]">Credit/Debit Cards</h1>
      <hr className='my-4 w-full' />

      {/* Render the card details */}
      {renderCardDetails()}

      <Button type="submit" form={true} label="Add New Card" customStyle="px-8 py-4 text-[18px] font-bold flex justify-center mt-10" onClick={handleAddNewCard} />
    </form>
  );
};

export default Bank;
