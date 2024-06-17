import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import Input from '../Components/Input';

const Report = ({ onSubmit, onClose }) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(reportDetails);
    setReportDetails({
      reason: '',
      email: '',
      details: '',
    }); // Clear inputs after submission
  };

  useEffect(() => {
    // Disable scrolling when the report form is open
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling when the report form is closed
      document.body.style.overflow = 'auto';
    };
  }, []);

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
              placeholder={'Enter report details...'}
              rows={5}
            />
          <div className="flex justify-between gap-4 mt-4">
            <div className='w-full'>
              <Button form={true} type="submit" label="Submit" customStyle="px-8 py-4 text-[18px] font-semibold w-full" />
            </div>
            <div className='w-full'>
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
