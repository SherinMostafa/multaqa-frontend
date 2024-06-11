import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import Button from '../Components/Button';
import Input from '../Components/Input';
import AuthContext from '../Context/AuthContext';
import { storage } from '../firebase'; // Adjust the path as necessary
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Information() {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    address: '',
    city: '',
    profileImg: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fname: user.fname || '',
        lname: user.lname || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        profileImg: user.profileImg || '',
      });
    }
  }, [user]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      const storageRef = ref(storage, `profile_images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileImg: downloadURL,
      }));
      setIsUploading(false);
    }
  };

  const handleImageRemove = () => {
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
      const response = await axios.patch(`http://localhost:5000/users/${user.email}`, formData);
      if (response.status === 200) {
        alert('Information updated successfully');
        setErrorMessage('');
        updateUser(response.data);  // Update the user in context
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
      <hr className='my-4 w-3/4' />
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Image</h2>
        <div className="flex flex-col space-y-4 py-8">
          <div className={`p-6 text-center rounded-lg ${formData.profileImg ? '' : 'border-dashed border-2 border-gray-300 w-fit'}`}>
            {formData.profileImg ? (
              <img src={formData.profileImg} alt="Profile" className="w-36 h-36 rounded-full object-cover shadow-lg" />
            ) : (
              <FaUser className="w-36 h-36 mx-auto text-gray-400" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="file-upload"
            className="hidden"
            disabled={isUploading}
          />
          <div className="flex space-x-4">
            <Button 
              type="button" 
              label={formData.profileImg ? "Change Image" : "Upload Profile Image"} 
              customStyle="px-4 py-2 text-[18px]" 
              onClick={() => document.getElementById('file-upload').click()}
              disabled={isUploading}
            />
            {formData.profileImg && (
              <Button 
                type="button" 
                label="Remove Image"
                customStyle="px-4 py-2 text-[18px] bg-[#ECF0F1] border-[#ECF0F1] text-black hover:text-white" 
                onClick={handleImageRemove}
                disabled={isUploading}
              />
            )}
          </div>
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
          />
          <Input
            id="lname"
            label="Last Name"
            type="text"
            value={formData.lname}
            onChange={handleInputChange}
          />
          <Input
            id="phone"
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
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

      <Button type="submit" form={true} label="Save" customStyle="px-8 py-4 text-[18px] font-bold w-3/4 flex justify-center" disabled={isUploading} />
    </form>
  );
}

export default Information;
