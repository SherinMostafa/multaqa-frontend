import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../Components/Input';
import Button from '../Components/Button';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId: initialEventId, quantity: initialQuantity, price: initialPrice, title: initialTitle } = location.state || {};

  // Initialize state with location.state values or default values
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    cardHolderName: '',
    cardNumber: '',
    expireDate: '',
    cvv: '',
  });
  // eslint-disable-next-line no-unused-vars
  const [eventId, setEventId] = useState(initialEventId || 0);
  // eslint-disable-next-line no-unused-vars
  const [quantity, setQuantity] = useState(initialQuantity || 0);
  // eslint-disable-next-line no-unused-vars
  const [price, setPrice] = useState(initialPrice || 0);
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState(initialTitle || '');
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = JSON.parse(localStorage.getItem('user'));
        if (!storedUserInfo) {
          throw new Error('No user information found in localStorage.');
        }

        setFormData((prevFormData) => ({
          ...prevFormData,
          fname: storedUserInfo.fname || '',
          lname: storedUserInfo.lname || '',
          email: storedUserInfo.email || '',
        }));

        const bankAccountId = storedUserInfo.bankAccount;
        if (!bankAccountId) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/bankAccount/${bankAccountId}`);
        const bankAcc = response.data;

        if (bankAcc) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            cardHolderName: bankAcc.cardHolderName || '',
            cardNumber: bankAcc.cardNumber || '',
            expireDate: bankAcc.expireDate || '',
            cvv: bankAcc.cvv || '',
          }));
        } else {
          throw new Error('Bank account details not found.');
        }
      } catch (error) {
        console.error('Error fetching user or bank account details:', error.message);
        alert('Error fetching user or bank account details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
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

      // Create or update bank account
      let response;
      if (storedUserInfo.bankAccount) {
        // If user already has a bank account, update it
        response = await axios.put(`http://localhost:5000/bankAccount/${storedUserInfo.bankAccount}`, newBankAccount);
      } else {
        // Otherwise, create a new bank account
        response = await axios.post('http://localhost:5000/bankAccount', newBankAccount);
      }

      // Update user info with new bank account ID
      const updatedBankAccountId = response.data._id;
      const updatedUserInfoResponse = await axios.get(`http://localhost:5000/users/email/${storedUserInfo.email}`);
      const updatedUserInfo = updatedUserInfoResponse.data;

      // Update localStorage with the new user object
      updatedUserInfo.bankAccount = updatedBankAccountId;
      localStorage.setItem('user', JSON.stringify(updatedUserInfo));

      // Show confirmation modal before final booking
      setShowConfirmModal(true);
    } catch (error) {
      console.error('Error during checkout:', error.message);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Alert the user with the error message
      } else {
        alert('Error during checkout. Please try again later.');
      }
    }
  };

  const handleConfirmOrder = async () => {
    try {
      // Perform actual booking process
      const storedUserInfo = JSON.parse(localStorage.getItem('user'));
      const requestData = {
        userId: storedUserInfo._id,
        bankAccountId: storedUserInfo.bankAccount,
        eventId,
        ticketPrice: price,
        ticketQuantity: quantity,
        title
      };

      await axios.post('http://localhost:5000/bookTicket', requestData);
      
      const updatedUserInfoResponse = await axios.get(`http://localhost:5000/users/email/${storedUserInfo.email}`);
      const updatedUserInfo = updatedUserInfoResponse.data;
      localStorage.setItem('user', JSON.stringify(updatedUserInfo));

      // On successful booking, navigate to confirmation page
      navigate('/Confirmation');
    } catch (error) {
      console.error('Error confirming order:', error.message);
      setShowConfirmModal(false);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Alert the user with the error message from backend
      } else {
        alert('Error confirming order. Please try again later.');
      }
    }
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  const subtotal = price * quantity;
  const total = subtotal;

  return (
    <div className="container mx-auto px-4 mt-10 mb-20">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#6F1A07]">Checkout</h1>
      <div className="bg-white shadow-xl rounded-md mx-auto p-6 md:flex md:max-w-5xl">
        <div className="md:w-3/5 md:border-r-2 md:border-gray-200 pr-6">
          <h2 className="text-2xl font-bold mb-12 text-center">Payment Details</h2>
          <div className="flex mb-6 space-x-4">
            <div className="w-1/2">
              <p className="mb-2"><strong>Name:</strong> {formData.fname} {formData.lname}</p>
            </div>
            <div className="w-1/2">
              <p className="mb-2 text-right"><strong>Email:</strong> {formData.email}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
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
              label="Complete Purchase"
              customStyle={'w-full sm:w-3/4 md:w-1/2 p-4 mt-8 flex justify-center mx-auto'}
            />
          </form>
        </div>
        <div className="md:w-2/5 md:ml-8 bg-gray-100 p-6 rounded-md mt-10 md:mt-0">
          <h2 className="text-xl font-bold text-center mb-10">Order Summary</h2>
          <div className="mb-4 pb-4">
            <div className="flex justify-between mb-4">
              <strong>{quantity} x {title}</strong>
              <span>EGP {price}</span>
            </div>
          </div>
          <div className="border-t border-gray-300 flex justify-between pt-4 text-xl font-bold">
            <strong>Total</strong>
            <span>EGP {total}</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Confirm Order</h2>
            <p className="mb-4 text-center">Are you sure you want to place this order?</p>
            <div className="flex justify-around">
              <Button
                type="button"
                label="Cancel"
                customStyle="px-6 py-2 font-bold flex justify-center mt-4"
                onClick={() => setShowConfirmModal(false)}
              />
              <Button
                type="button"
                label="Confirm"
                customStyle="px-6 py-2 font-bold flex justify-center mt-4"
                onClick={handleConfirmOrder}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
