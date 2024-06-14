import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    onlineUrl: '',
    image: null,
    category_id: '',
    user_id: '',
  });

  const [locationType, setLocationType] = useState('location');

  useEffect(() => {
    const fetchUserId = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return user._id;
      }
      return null;
    };

    const userId = fetchUserId();
    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user_id: userId,
      }));
    } else {
      alert('User ID not found in local storage');
    }
  }, []);

  const handleImageChange = (acceptedFiles) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: acceptedFiles[0],
    }));
  };

  const handleRemoveImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });
  
    try {
      const response = await axios.post('http://localhost:5000/event', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response:', response.data); // Check the response data in console
  
      if (response.status === 200) {
        const { event } = response.data;
        if (!event || !event._id) {
          throw new Error('Event ID not found in response');
        }
  
        alert('Event created successfully');
  
        // Reset form data after successful creation
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          onlineUrl: '',
          image: null,
          category_id: '',
          user_id: formData.user_id,
        });
  
        localStorage.setItem('eventId', response.data.event._id);

        // Navigate to tickets page with event ID
        navigate(`/tickets/${response.data.event._id}`);
        
      } else {
        throw new Error(response.data.error || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error.response?.data || error.message);
      alert('Failed to create event. Please check console for details.');
    }
  };
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleLocationTypeChange = (type) => {
    setLocationType(type);
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: '',
      onlineUrl: '',
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: handleImageChange,
    multiple: false,
  });

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="container mx-auto px-4 mt-4 mb-20">
      <Button
  type="button"
  label="Location"
  onClick={() => handleLocationTypeChange('location')}
  customStyle={locationType === 'location' ? 'activeStyle' : 'inactiveStyle'}
/>
      <Button
        type="button"
        label="Go Back"
        onClick={goBack}
        link={true}
        customStyle={'p-4'}
      />

      <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-md mx-auto my-5 p-12 mt-10 md:max-w-4xl">
        <h2 className="text-4xl font-bold mb-14 text-[#6F1A07] text-center">Create Event</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <div
              {...getRootProps()}
              className="dropzone mb-10"
              style={{
                padding: formData.image ? '' : '20px',
                textAlign: 'center',
                cursor: 'pointer',
                border: formData.image ? 'none' : 'dashed 2px grey',
              }}
            >
              <input {...getInputProps()} />
              {formData.image ? (
                <img src={URL.createObjectURL(formData.image)} alt="Uploaded" className="max-w-full" />
              ) : (
                <p>Drag 'n' drop an image here, or click to select an image</p>
              )}
            </div>

            {formData.image && (
              <div className="mt-4 mb-10">
                <Button
                  type="button"
                  label="Remove Image"
                  onClick={handleRemoveImage}
                  customStyle={'px-4 py-2'}
                />
              </div>
            )}

            <Input
              id="title"
              type="text"
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <Input
              id="description"
              textArea={true}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="date"
                type="date"
                label="Date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
              <Input
                id="time"
                type="time"
                label="Time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
              />
            </div>

            <Input
              id="location"
              type="text"
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />

            <Input
              id="category_id"
              name="category_id"
              label="Category"
              type="select"
              value={formData.category_id}
              onChange={handleInputChange}
              selectOptions={[
                { value: '', label: 'Select an option', disabled: true },
                { value: '60d21b4667d0d8992e610c85', label: 'Category 1' },
                { value: '60d21b4667d0d8992e610c86', label: 'Category 2' },
              ]}
            />

            <Button
              form={true}
              type="submit"
              label="Create Event"
              customStyle={'w-full sm:w-3/4 md:w-1/2 p-4 mt-8 flex justify-center mx-auto'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
