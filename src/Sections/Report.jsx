import React, { useState } from 'react';
import Button from '../Components/Button';
import Input from '../Components/Input';
import axios from 'axios';

const Report = ({ onSubmit, onClose, eventId }) => {
  const [reportDetails, setReportDetails] = useState({
    reason: '',
    email: '',
    details: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setReportDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Retrieve user object from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Ensure user and user._id are available
    if (!user || !user._id) {
      console.error('User ID not found in localStorage or invalid structure:', user);
      // Optionally handle this case (e.g., redirect to login page or prompt user to authenticate)
      return;
    }
    
    const dataToSubmit = {
      ...reportDetails,
      event_id: eventId,
      user_id: user._id, // Use user._id instead of localStorage.getItem('user')
    };
  
    try {
      const response = await axios.post('http://localhost:5000/report', dataToSubmit);
      if (response.status === 200) {
        alert('Report submitted successfully');
        onSubmit(dataToSubmit);
        setReportDetails({
          reason: '',
          email: '',
          details: '',
        });
        onClose();
      } else {
        alert('Failed to submit report');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report');
    }
  };
    
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-90 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Report Event</h2>
        <form onSubmit={handleSubmit}>
          <Input
            id="reason"
            name="reason"
            label="Reason for Report"
            type="select"
            value={reportDetails.reason}
            onChange={handleInputChange}
            required={true}
            selectOptions={[
              { value: '', label: 'Select a reason', disabled: true },
              { value: 'Spam', label: 'Spam' },
              { value: 'Fraudulent Event Listings or Scams', label: 'Fraudulent Event Listings or Scams' },
              { value: 'Harmful Content', label: 'Harmful Content' },
              { value: 'Violence or Extremism', label: 'Violence or Extremism' },
              { value: 'Canceled Event', label: 'Canceled Event' },
              { value: 'Request a Refund', label: 'Request a Refund' },
              { value: 'Copyright or Trademark Infringement', label: 'Copyright or Trademark Infringement' },
            ]}
          />
          <Input
            id="email"
            type="email"
            label="Email"
            name="email"
            value={reportDetails.email}
            onChange={handleInputChange}
            required={true}
          />
          <Input
            id="details"
            textArea={true}
            label="Report Details"
            name="details"
            value={reportDetails.details}
            onChange={handleInputChange}
            placeholder="Enter report details..."
            rows={5}
          />
          <div className="flex justify-between gap-4 mt-4">
            <div className="w-full">
              <Button
                form={true}
                type="submit"
                label="Submit"
                customStyle="px-8 py-4 text-[18px] font-semibold w-full"
              />
            </div>
            <div className="w-full">
              <Button
                type="button"
                label="Cancel"
                customStyle="px-8 py-4 text-[18px] font-bold w-full bg-[#ECF0F1] border-[#ECF0F1] text-black hover:text-white"
                onClick={onClose}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Report;
