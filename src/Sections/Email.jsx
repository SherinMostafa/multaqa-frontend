import React, { useState, useContext } from 'react';
import Button from '../Components/Button';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import Input from '../Components/Input';

const Email = () => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoggedIn, user, updateUser } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const resetFields = () => {
    setPassword('');
    setNewEmail('');
    setErrorMessage('');
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:5000/users/update-email/${user.email}`;
      const response = await axios.patch(url, {
        password: password,
        newEmail: newEmail
      });
  
      // Assuming the backend returns the updated user object
      const updatedUser = response.data;
  
      // Update the entire user object in the context
      updateUser(updatedUser);
  
      // Show success message or perform any other actions
      alert("Email updated successfully");
  
      // Reset fields and close the modal
      resetFields();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating email:', error);
  
      // Handle specific error cases if needed
      if (error.response && error.response.status === 401) {
        setErrorMessage('Incorrect password');
      } else if (error.response && error.response.status === 400 && error.response.data === 'Please enter a new email different from the current one') {
        setErrorMessage('Please enter a new email');
      } else {
        setErrorMessage('Failed to update email');
      }
    }
  };
  
  return (
    <div className="flex-1 pl-2 pt-4 lg:p-10 min-h-96">
      <h1 className="text-2xl font-bold mb-6 text-[#6F1A07]">Change Email</h1>
      <hr className='my-4 w-full' />
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Email Address</h2>
        {isLoggedIn && <p className="font-semibold my-8 ml-2">{user.email}</p>}
      </section>
      <Button type="button" label="Update" customStyle="px-8 py-4 text-[18px] font-bold flex justify-center" onClick={() => setShowModal(true)} />

      {showModal && (
        <form onSubmit={handleSave} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-3/4 lg:w-1/2">
            <h2 className="text-xl font-semibold mb-8 text-center">Change your email</h2>
            <Input
              placeholder={'Enter Email'}
              type={'email'}
              value={newEmail}
              onChange={handleEmailChange}
              required
              />
            <Input
              placeholder={'Enter Password'}
              type={'password'}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {errorMessage && <p className="text-red-500 text-center mb-8">{errorMessage}</p>}
            <div className="flex justify-between gap-4">
              <div className='w-full'>
                <Button form={true} type="submit" label="Save" customStyle="px-8 py-4 text-[18px] font-semibold w-full" />
              </div>
              <div className='w-full'>
                <Button type="button" label="Cancel" customStyle="px-8 py-4 text-[18px] font-bold w-full bg-[#ECF0F1] border-[#ECF0F1] text-black hover:text-white" onClick={() => { setShowModal(false); resetFields(); }} />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Email;
