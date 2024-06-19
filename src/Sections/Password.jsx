import React, { useState, useContext } from 'react';
import axios from 'axios';
import Button from '../Components/Button';
import Input from '../Components/Input';
import AuthContext from '../Context/AuthContext';

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(AuthContext);

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    setErrorMessage('');
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setErrorMessage('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrorMessage('');
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match');
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:5000/users/update-password/${user.email}`, {
        password: currentPassword,
        newPassword: newPassword,
      });
      if (response.status === 200) {
        alert('Password updated successfully');
        setErrorMessage('');
        // Reset input fields after successful update
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error(response.data || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Incorrect current password');
      } else {
        setErrorMessage(error.response?.data || 'Failed to update password');
      }
    }
  };

  return (
    <form className="flex-1 pl-2 pt-4 lg:p-10" onSubmit={handleSave}>
      <h1 className="text-2xl font-bold mb-6 text-[#6F1A07]">Change Password</h1>
      <hr className='my-4 w-full' />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Set a new password</h2>
        <div className="space-y-4">
          <Input
            id="current-password"
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            required
          />
          <Input
            id="new-password"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          <Input
            id="confirm-password"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
      </section>

      {errorMessage && <p className="text-red-500 text-center mb-8">{errorMessage}</p>}

      <Button type="submit" form={true} label="Save" customStyle="px-8 py-4 text-[18px] font-bold flex justify-center" />
    </form>
  );
}

export default Password;
