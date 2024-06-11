import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import Input from '../Components/Input';

const Report = ({ onSubmit, onClose }) => {
  const [reportDetails, setReportDetails] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(reportDetails);
    setReportDetails(""); // Clear input after submission
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
        <form onSubmit={handleSubmit}>
          <Input
            value={reportDetails}
            onChange={(e) => setReportDetails(e.target.value)}
            placeholder="Enter report details..."
            textArea={true}
            id={'report'}
            rows={'8'}
            cols={'80'}
          />
          <div className="flex justify-between gap-4 mt-4">
            <div className='w-full'>
              <Button form={true} type="submit" label="Save" customStyle="px-8 py-4 text-[18px] font-semibold w-full" />
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
