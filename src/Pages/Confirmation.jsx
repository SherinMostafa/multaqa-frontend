import React from 'react';
import { TiTick } from 'react-icons/ti'; // Importing TiTick icon from react-icons/ti
import Button from '../Components/Button';

function Confirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Booking Confirmed !</h2>
          <p className="mt-8 text-lg text-gray-600">Thank you for your booking. Your transaction has been successfully completed.</p>
        </div>
        <div>
          <div className="flex items-center justify-center">
            <TiTick className="h-20 w-20 text-green-500" /> {/* Using TiTick icon from react-icons */}
          </div>
          {/* <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">Booking Details</h3>
            <p className="text-gray-600 mt-1">Here are your booking details:</p>
            <ul className="text-left mt-4 space-y-2">
              <li className="text-gray-700"><strong>Booking ID:</strong> #123456</li>
              <li className="text-gray-700"><strong>Date:</strong> 2024-06-19</li>
              <li className="text-gray-700"><strong>Time:</strong> 2:00 PM</li>
              <li className="text-gray-700"><strong>Location:</strong> 123 Main Street, Anytown, USA</li>
            </ul>
          </div> */}
          <div className="flex justify-center mt-8">
            <Button
              type="button"
              label="Back to Home"
              customStyle="px-8 py-4 font-bold flex justify-center"
              linkURL={'/'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
