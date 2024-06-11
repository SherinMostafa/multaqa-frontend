import React from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../Components/Button';

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; // Get the email from state

  const handleUserRole = async (role) => {
    try {
      if (!email) {
        console.error('Email not found');
        return;
      }

      const response = await axios.post('http://localhost:5000/role', {
        email: email, // Pass the email
        role: role,
      });

      console.log('User role updated:', response.data);
      if (role === 'attendee') {
        navigate('/Attendee');
      } else if (role === 'creator') {
        navigate('/Organizer');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-50 p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-[#6F1A07] mt-10 md:mt-0">Welcome to Multaqa</h1>
      <p className="text-base mb-12 text-center">
        Please choose your role to get started
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-10 space-y-4 md:space-y-0 md:space-x-8">
        
        {/* Attendee Section */}
        <div className="flex flex-col items-center justify-between px-4 pb-8 pt-4 bg-white rounded-lg shadow-lg w-full lg:w-96 h-[340px]">
          <img src="/Images/jakob-dalbjorn-cuKJre3nyYc-unsplash.jpg" alt="Attendee" className="w-full h-40 object-cover rounded-t-md" />
          <p className="my-4 text-center">Join and participate in exciting events!</p>
          <Button label={'Find an experience'} customStyle={'px-6 py-4 text-[18px]'} onClick={() => handleUserRole('attendee')} />
        </div>
        
        {/* Creator Section */}
        <div className="flex flex-col items-center justify-between px-4 pb-8 pt-4 bg-white rounded-lg shadow-lg w-full lg:w-96 h-[340px]">
          <img src="/Images/jakob-dalbjorn-cuKJre3nyYc-unsplash.jpg" alt="Creator" className="w-full h-40 object-cover rounded-t-md" />
          <p className="my-4 text-center">Create events and share your knowledge!</p>
          <Button label={'Plan your best event ever'} customStyle={'px-6 py-4 text-[18px]'} onClick={() => handleUserRole('creator')} />
        </div>
        
      </div>
    </div>
  );
};

export default Welcome;
