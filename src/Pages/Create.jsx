import React, { useState } from 'react';
import axios from 'axios';
import Button from '../Components/Button';
import Input from '../Components/Input';

const Create = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    eventType: '',
    image: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/events', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        alert('Event created successfully');
      } else {
        throw new Error(response.data || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-md mx-auto my-5 p-12 mt-10 md:max-w-4xl">
        <h2 className="text-4xl font-bold mb-14 text-[#6F1A07] text-center">Create Event</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <Input
              id="title"
              type="text"
              label="Event Title"
              name="title"
              value={formData.title}
            />
            <Input
              id="description"
              textArea={true}
              label="Description"
              name="description"
              value={formData.description}
            />
            <div className='grid grid-cols-2 gap-4'>
              <Input
                id="date"
                type="date"
                label="Date"
                name="date"
                value={formData.date}
              />
              <Input
                id="time"
                type="time"
                label="Time"
                name="time"
                value={formData.time}
              />
            </div>
            <Input
              id="location"
              type="text"
              label="Location"
              name="location"
              value={formData.location}
            />
            <Input
              id="eventType"
              label="Event Type"
              type="select"
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              selectOptions={[
                { value: '', label: 'Select an option', disabled: true },
                { value: 'Conference', label: 'Conference' },
                { value: 'Workshop', label: 'Workshop' },
                { value: 'Webinar', label: 'Webinar' },
              ]}
            />
            {/* <Input
            id="city"
            label="City"
            type="select"
            value={formData.city}
            onChange={handleInputChange}
            selectOptions={[
              { value: '', label: 'Select an option', disabled: true },
              { value: 'Cairo', label: 'Cairo' },
              { value: 'Giza', label: 'Giza' },
            ]}
          /> */}

            <Button
              form={true}
              label={'Create Event'}
              type={'submit'}
              customStyle={'w-full sm:w-3/4 md:w-1/2 p-4 mt-8 flex justify-center mx-auto'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
