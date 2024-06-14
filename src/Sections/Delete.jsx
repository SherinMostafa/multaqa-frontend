import React, { useState, useContext } from 'react';
import axios from 'axios';
import Button from '../Components/Button';
import Input from '../Components/Input';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Delete = () => {
  const { user, logout } = useContext(AuthContext);
  const [deleteInput, setDeleteInput] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleDeleteInputChange = (e) => {
    setDeleteInput(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    // Check if 'DELETE' is typed correctly
    if (deleteInput !== 'DELETE') {
      setErrorMessage('Please type "DELETE" correctly.');
      return;
    }

    const confirmDeletion = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDeletion) {
      return;
    }

    try {
      // Send DELETE request to delete user account
      const response = await axios.delete(`http://localhost:5000/users/${user.email}`, {
        data: { password } // Pass password in the request body
      });

      // Check if user was deleted successfully
      if (response.status === 200) {
        // Logout the user
        logout();
        // Redirect to home page after successful deletion
        navigate('/');
      } else {
        setErrorMessage('Error deleting account. Please try again.');
      }
    } catch (error) {
      // Handle specific error for incorrect password
      if (error.response && error.response.status === 401) {
        setErrorMessage('Incorrect password. Please enter your correct password.');
      } else {
        setErrorMessage('Error deleting account. Please try again.');
        console.error('Error deleting account:', error);
      }
    }
  };

  return (
    <form onSubmit={handleDeleteAccount} className="flex-1 pl-2 pt-4 lg:p-10">
      <h1 className="text-2xl font-bold mb-6 text-[#6F1A07]">Close Account</h1>
      <hr className='my-4 w-full' />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Verify account deletion</h2>
        <div className="space-y-4">
          <Input
            label={`Type 'DELETE'`}
            type="text"
            value={deleteInput}
            onChange={handleDeleteInputChange}
            required
          />
          <Input
            id="password"
            label="Enter Your Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
      </section>

      {errorMessage && <p className="text-red-500 text-center mb-8">{errorMessage}</p>}

      <Button
        type="submit"
        form={true}
        label="Delete"
        customStyle="px-8 py-4 text-[18px] font-bold w-3/4 flex justify-center"
      />
    </form>
  );
};

export default Delete;
