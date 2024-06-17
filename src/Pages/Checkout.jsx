// src/components/Checkout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Components/Input';
import Button from '../Components/Button';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    alert('Checkout successful!');
    navigate('/confirmation'); // Redirect to confirmation page
  };

  return (
    <div className="container mx-auto px-4 mt-4 mb-20">
      <div className="bg-white shadow-xl rounded-md mx-auto p-6 md:max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
        <form onSubmit={handleSubmit}>
            <Input
                id="name"
                type="text"
                label="Name"
                name="text"
                value={formData.name}
                onChange={handleInputChange}
                required={true}
            />
            <Input
                id="email"
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required={true}
            />
            <Input
                id="phone"
                type="tel"
                label="Phone"
                name="phone"
                value={formData.phone}
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
                id="expiryDate"
                type="text"
                label="Expiry Date"
                name="expiryDate"
                value={formData.expiryDate}
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
    </div>
  );
};

export default Checkout;
