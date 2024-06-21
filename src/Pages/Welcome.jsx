import React, {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

const Welcome = () => {
  const userType = localStorage.getItem('userType');
  useEffect(()=>{
    console.log(userType);
      if (userType){
        navigate("/");
      }
  });

  const navigate = useNavigate();
  // const { email } = location.state || {}; // Get the email from state
  const id = JSON.parse(localStorage.getItem("user"))._id;

  const handleUserRole = async (role) => {
    // console.log(role);
    try {
      if (!id) {
        console.error('Email not found');
        return;
      }

      
      
      const response = await axios.post('http://localhost:5000/role', {
        userId: id, // Pass the email
        role: role,
      });
      console.log('userId:', id);
console.log('role:', role);

      console.log('User role updated:', response.data);
      if (role === 'Attendee') {
        localStorage.setItem("userType", 'Attendee');
        navigate('/');
      } else if (role === 'Organizer') {
        localStorage.setItem("userType", 'Organizer');
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with status:', error.response.status);
        console.error('Server error message:', error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from server:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error setting up the request:', error.message);
      }
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
          <Button label={'Find an experience'} customStyle={'px-6 py-4 text-[18px]'} onClick={() => handleUserRole('Attendee')} />
        </div>
        
        {/* Organizer Section */}
        <div className="flex flex-col items-center justify-between px-4 pb-8 pt-4 bg-white rounded-lg shadow-lg w-full lg:w-96 h-[340px]">
          <img src="/Images/jakob-dalbjorn-cuKJre3nyYc-unsplash.jpg" alt="Organizer" className="w-full h-40 object-cover rounded-t-md" />
          <p className="my-4 text-center">Create events and share your knowledge!</p>
          <Button label={'Plan your best event ever'} customStyle={'px-6 py-4 text-[18px]'} onClick={() => handleUserRole('Organizer')} />
        </div>
        
      </div>
    </div>
  );
};

export default Welcome;
