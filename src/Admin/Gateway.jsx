import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setServerMessage('');

    if (!isValidEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/admin/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log(response);
        localStorage.setItem('token', response.data.token); // Store the token
        localStorage.setItem('admin', JSON.stringify(response.data.admin)); // Store admin data
        localStorage.setItem('userType', response.data.admin.role); // Store the token

        navigate('/Dashboard'); // Redirect to the home page
      } else {
        setServerMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setServerMessage(error.response.data.message);
      } else {
        setServerMessage('An error occurred while signing in. Please try again later.');
      }
    }
  };

  return (
    <>
      <div className="p-5 bg-cover flex justify-center items-center" style={{ backgroundImage: 'url(/Images/photo_26_2024-06-22_23-13-16.jpg)', height: '100vh' }}>
        <div className="container mx-auto px-4">
          <div className="bg-white bg-opacity-100 backdrop-blur-md shadow-xl rounded-md mx-auto p-12 max-w-4xl">
            <h2 className="text-2xl md:text-4xl uppercase font-bold mb-14 text-[#6F1A07] text-center">Welcome to Admin Dashboard</h2>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center gap-4">
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  withFloatingEffect={true}
                />
                <Input
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  withFloatingEffect={true}
                />
                {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
                {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
                {serverMessage && <span className="text-red-500 text-sm">{serverMessage}</span>}
              </div>
              <Button form={true} label={'Sign In'} type={'submit'} customStyle={'w-full sm:w-3/4 md:w-1/2 p-4 mt-8 flex justify-center mx-auto'} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
