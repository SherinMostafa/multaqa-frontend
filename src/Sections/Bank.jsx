import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import axios from 'axios';
import { FcSimCardChip } from 'react-icons/fc';
import Input from '../Components/Input'; // Import the Input component

const Bank = () => {
  const [card, setCard] = useState(null); // State to hold the user's card
  const [showCardForm, setShowCardForm] = useState(false); // State to control form visibility
  const [formData, setFormData] = useState({
    cardHolderName: '',
    cardNumber: '',
    expireDate: '',
    cvv: '',
  }); // State to manage form data
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState(null); // State to store the user's ID

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserId(storedUser._id);
      if (storedUser.bankAccount) {
        fetchCard(storedUser.bankAccount);
      }
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedUserInfo = JSON.parse(localStorage.getItem('user'));
      if (!storedUserInfo) {
        throw new Error('User information missing.');
      }

      // Prepare new bank account data
      const newBankAccount = {
        userId: storedUserInfo._id,
        cardHolderName: formData.cardHolderName,
        cardNumber: formData.cardNumber,
        expireDate: formData.expireDate,
        cvv: formData.cvv,
      };

      // Create a new bank account
      const response = await axios.post('http://localhost:5000/bankAccount', newBankAccount);

      // Update user info with new bank account ID
      const updatedBankAccountId = response.data._id;
      const updatedUserInfoResponse = await axios.get(`http://localhost:5000/users/email/${storedUserInfo.email}`);
      const updatedUserInfo = updatedUserInfoResponse.data;

      // Update localStorage with the new user object
      updatedUserInfo.bankAccount = updatedBankAccountId;
      localStorage.setItem('user', JSON.stringify(updatedUserInfo));

      // Update the card state with the new card details
      setCard(newBankAccount);
      setShowCardForm(false); // Hide the form after submission
    } catch (error) {
      console.error('Error adding new card:', error.message);
      alert('Error adding new card. Please try again later.');
    }
  };

  return (
    <div className="flex-1 pl-2 pt-4 lg:p-10">
      <h1 className="text-2xl font-bold mb-6 text-[#6F1A07]">Credit/Debit Cards</h1>
      <hr className='my-4 w-full' />

      {/* Render the card details if the user has a card */}
      {!showCardForm && renderCardDetails()}

      {/* Render the form if the user does not have a bank account */}
      {showCardForm && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Add New Card</h2>
          <form onSubmit={handleFormSubmit}>
            <Input
              id="cardHolderName"
              type="text"
              label="Card Holder Name"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleInputChange}
              required={true}
            />
            <Input
              id="cardNumber"
              type="text"
              label="Card Number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required={true}
            />
            <Input
              id="expireDate"
              type="text"
              label="Expiry Date"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleInputChange}
              required={true}
            />
            <Input
              id="cvv"
              type="text"
              label="CVV"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              required={true}
            />
            <Button
              form={true}
              type="submit"
              label="Submit"
              customStyle="px-8 py-4 text-[18px] font-bold flex justify-center mt-4"
            />
          </form>
        </div>
      )}

      {/* Button to show the form for adding a new card */}
      {!showCardForm && (
        <Button
          type="button"
          form={false}
          label="Add New Card"
          customStyle="px-8 py-4 text-[18px] font-bold flex justify-center mt-10"
          onClick={() => setShowCardForm(true)}
        />
      )}
    </div>
  );
};

export default Bank;
