import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import Button from '../Components/Button';
import Input from '../Components/Input';
import AuthContext from '../Context/AuthContext';

function Information() {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    address: '',
    city: '',
    profileImg: '', // Store image path directly
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        fname: user.fname || '',
        lname: user.lname || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        profileImg: user.profileImg || '', // Set image path if available
      });
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          profileImg: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profileImg: '',
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = {
        fname: formData.fname,
        lname: formData.lname,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        profileImg: formData.profileImg, // Use the stored image path
      };

      const response = await axios.patch(`http://localhost:5000/users/${user.email}`, formDataToSubmit);

      if (response.status === 200) {
        alert('Information updated successfully');
        setErrorMessage('');
        updateUser(response.data);
      } else {
        throw new Error(response.data || 'Failed to update information');
      }
    } catch (error) {
      console.error('Error updating information:', error);
      setErrorMessage(
        error.response?.data?.message || 'Failed to update information'
      );
    }
  };

  return (
    <form className="flex-1 pl-2 pt-4 lg:p-10" onSubmit={handleSave}>
      <h1 className="text-2xl font-bold mb-6 text-[#6F1A07]">Account Information</h1>
      <hr className='my-4 w-full' />
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Image</h2>
        <div className="mb-10 w-fit" style={{ textAlign: 'center' }}>
          {formData.profileImg ? (
            <img src={formData.profileImg} alt="Profile" className="w-36 h-36 rounded-full" />
          ) : (
            <FaUser className="w-36 h-36 mx-auto text-gray-400" />
          )}
        </div>
        <div className="flex space-x-4">
          <Button 
            type="button" 
            label="Upload Image"
            customStyle="px-4 py-2 text-[18px] bg-[#ECF0F1] border-[#ECF0F1] text-black hover:text-white" 
            onClick={() => document.getElementById('fileInput').click()}
          />
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          {formData.profileImg && (
            <Button 
              type="button" 
              label="Remove Image"
              customStyle="px-4 py-2 text-[18px] bg-[#ECF0F1] border-[#ECF0F1] text-black hover:text-white" 
              onClick={handleRemoveImage}
            />
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="space-y-4">
          <Input
            id="fname"
            label="First Name"
            type="text"
            value={formData.fname}
            onChange={handleInputChange}
            required={true}
          />
          <Input
            id="lname"
            label="Last Name"
            type="text"
            value={formData.lname}
            onChange={handleInputChange}
            required={true}
          />
          <Input
            id="phone"
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            required={false}
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Home Address</h2>
        <div className="space-y-4">
          <Input
            id="address"
            label="Address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            required={false}
          />
          <Input
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
          />
        </div>
      </section>

      {errorMessage && <p className="text-red-500 text-center mb-8">{errorMessage}</p>}

      <Button type="submit" form={true} label="Save" customStyle="px-8 py-4 text-[18px] font-bold flex justify-center" />
    </form>
  );
}

export default Information;
