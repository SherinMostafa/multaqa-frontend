import React, { useState } from 'react';
import Input from '../Components/Input';
import Button from '../Components/Button';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await axios.post('http://localhost:5000/contact-us', formData);
      if (response.status === 201) {
        window.alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setErrorMessage('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Failed to send message');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden my-4 p-12 mt-10 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-14 text-[#6F1A07] text-center">Contact Us</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div className="px-6 py-8">
              <form onSubmit={handleSubmit}>
                <Input
                  id="name"
                  type="text"
                  label="Name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Input
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  id="message"
                  label="Message"
                  name="message"
                  rows={4}
                  placeholder="Your message"
                  textArea={true}
                  value={formData.message}
                  onChange={handleInputChange}
                />

                {errorMessage && <p className="text-red-500 text-center mb-8">{errorMessage}</p>}
                
                <Button form={true} label={'Send Message'} type={'submit'} customStyle={'py-3 px-6'} />
              </form>
            </div>
            <div className="px-6 flex justify-center items-center">
              <img 
                src="/Images/photo_20_2024-06-22_23-13-16.jpg" 
                alt="Contact Us" 
                className="w-full h-[500px] rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
