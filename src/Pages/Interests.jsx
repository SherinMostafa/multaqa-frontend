// src/components/Interests.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Button from '../Components/Button';

const interestsList = ['Music', 'Sports', 'Technology', 'Travel', 'Cooking', 'Reading'];

const Interests = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterestChange = (interest) => {
    setSelectedInterests(prevInterests =>
      prevInterests.includes(interest)
        ? prevInterests.filter(i => i !== interest)
        : [...prevInterests, interest]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = 'exampleUserId'; // Replace with actual user ID from context or props
      const response = await axios.post('/api/saveInterests', {
        userId: userId,
        interests: selectedInterests,
      });
      console.log('Interests saved:', response.data);
      // You can navigate to another page or show a success message here
    } catch (error) {
      console.error('Error saving interests:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Select Your Interests</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {interestsList.map(interest => (
            <label key={interest} className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition duration-300">
              <input
                type="checkbox"
                value={interest}
                checked={selectedInterests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-lg">{interest}</span>
            </label>
          ))}
        </div>
        <Button form={true} type={'submit'} label={'Save Interests'} customStyle={'w-full p-4 text-[18px]'} />
      </form>
    </div>
  );
};

export default Interests;
