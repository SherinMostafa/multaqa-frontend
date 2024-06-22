import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { useDropzone } from 'react-dropzone';

const Create = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    onlineUrl: '',
    image: '',
    category_id: '',
    user_id: '',
  });

  const [locationType, setLocationType] = useState('location');
  const navigate = useNavigate();

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
      // Check if user has filled specific data on backend
      checkOrganizerData(userId);
      // Check if user has a bank account
      checkBankAccount(userId);
    } else {
      console.log('User ID not found in local storage');
      alert('Please login to your account.');
      navigate('/Login');
    }
  }, [navigate]);

  const handleImageChange = (acceptedFiles) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: acceptedFiles[0],
    }));
  };

  const handleRemoveImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!isFormDataComplete()) {
      alert('Please fill in all required fields.');
      return;
    }

    // Check if specific data fields are filled on backend
    const userId = formData.user_id;
    const organizerData = await checkOrganizerData(userId);
    if (!organizerData) {
      alert('Please fill in all required information in Finance section before creating an event.');
      navigate('/Settings'); // Redirect to Finance page if necessary data is missing
      return;
    }

    // Check if user has a bank account
    const hasBankAccount = await checkBankAccount(userId);
    if (!hasBankAccount) {
      alert('Please add a bank account before creating an event.');
      navigate('/Settings'); // Redirect to Settings page if bank account is missing
      return;
    }

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

      if (response.status === 201) {
        const eventId = response.data.event._id; // Assuming event ID is returned in response
        localStorage.setItem('eventId', eventId); // Store eventId in localStorage
        alert('Event created successfully');
        navigate('/Ticket'); // Redirect to the ticket page
      } else {
        throw new Error('Failed to create event');
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

  const isFormDataComplete = () => {
    const { title, description, date, time, location, onlineUrl, category_id } = formData;
    return title && description && date && time && category_id && (locationType === 'onlineUrl' ? onlineUrl : location);
  };

  const checkOrganizerData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/organizer/${userId}`);
      const { accountNumber, companyType, birthDayDate, website_url } = response.data;
      // Check if specific fields are filled
      if (!accountNumber || !companyType || !birthDayDate || !website_url) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error fetching organizer data:', error.response?.data || error.message);
      return false;
    }
  };

  const checkBankAccount = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/id/${userId}`);
      const { bankAccount } = response.data;
      // Check if user has a bank account
      console.log(bankAccount);
      if (!bankAccount) {
        return false;
      }
      console.log('User has a bank account:', bankAccount);
      return true;
    } catch (error) {
      console.error('Error fetching user data:', error.response?.data || error.message);
      return false;
    }
  };

  return (
    <div className="container mx-auto px-4 mt-4 mb-20">
      <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-md mx-auto my-5 p-12 mt-10 md:max-w-4xl">
        <h2 className="text-4xl font-bold mb-14 text-[#6F1A07] text-center">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div {...getRootProps()} className="dropzone mb-10" style={{ padding: formData.image ? '' : '20px', textAlign: 'center', cursor: 'pointer', border: formData.image ? 'none' : 'dashed 2px grey' }}>
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
            <div className="mb-4 mt-10">
              <div className="flex gap-6 mb-6">
                <Button
                  type="button"
                  label="Location"
                  onClick={() => handleLocationTypeChange('location')}
                  customStyle={locationType === 'location' ? 'px-4 py-2 bg-[#A8763E] border-[#A8763E] rounded-full' : 'px-4 py-2 rounded-full'}
                />
                <Button
                  type="button"
                  label="Online"
                  onClick={() => handleLocationTypeChange('onlineUrl')}
                  customStyle={locationType === 'onlineUrl' ? 'px-4 py-2 bg-[#A8763E] border-[#A8763E] rounded-full' : 'px-4 py-2 rounded-full'}
                />
              </div>
            </div>
            {locationType === 'location' && (
              <Input
                id="location"
                type="text"
                label="Location"
                name="location"
                customStyle={'mb-10'}
                value={formData.location}
                onChange={handleInputChange}
              />
            )}
            {locationType === 'onlineUrl' && (
              <Input
                id="onlineUrl"
                type="text"
                label="Online URL"
                name="onlineUrl"
                customStyle={'mb-10'}
                value={formData.onlineUrl}
                onChange={handleInputChange}
              />
            )}
            <Input
              id="category_id"
              name="category_id"
              label="Category"
              type="select"
              value={formData.category_id}
              onChange={handleInputChange}
              selectOptions={[
                { value: '', label: 'Select an option', disabled: true },
                { value: '666ccf55a86bb73a8fe40915', label: 'Science' },
                { value: '666ccfd3a86bb73a8fe40917', label: 'Art' },
                { value: '666cd023a86bb73a8fe40919', label: 'Health' },
                { value: '666cd069a86bb73a8fe4091b', label: 'Charity' },
                { value: '666cd0b4a86bb73a8fe4091d', label: 'Bazars' },
                { value: '666cd14aa86bb73a8fe4091f', label: 'Entertainment' },
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
