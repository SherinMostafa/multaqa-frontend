import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setServerMessage('');

    if (!isValidEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        email,
        password,
        fname,
        lname,
        phone,
      });

      if (response.status === 200) {
        navigate('/Welcome'); // Include email in the state
      }
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setServerMessage(error.response.data.message);
      } else {
        setServerMessage('An error occurred while registering. Please try again later.');
      }
    }
  };

  return (
    <>
      <div className="p-5 bg-cover bg-" style={{ backgroundImage: 'url(/Images/product-school-DL-yyYDDNX4-unsplash.jpg)', height: '200px', marginBottom: '5px', backgroundPositionY: '30%' }}></div>
      
      <div className="container mx-auto px-4">
        <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-md mx-auto my-5 p-12 -mt-24 md:max-w-4xl">
          <h2 className="text-4xl uppercase font-bold mb-14 text-[#6F1A07] text-center">Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-4">
              <Input
                id="firstName"
                label="First name"
                type="text"
                value={fname}
                onChange={(e) => setFirstName(e.target.value)}
                withFloatingEffect={true}
              />
              <Input
                id="lastName"
                label="Last name"
                type="text"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
                withFloatingEffect={true}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                withFloatingEffect={true}
              />
              <Input
                id="phone"
                label="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              {serverMessage && <span className="text-red-500 text-sm">{serverMessage}</span>}
            </div>
            <Button form={true} label={'Sign Up'} type={'submit'} customStyle={'w-full sm:w-3/4 md:w-1/2 p-4 mt-8 flex justify-center mx-auto'} />
          </form>

          <div className="flex justify-center items-center mt-6">
            <p className='pr-2'>
              Already have an account ?
            </p>
            <Button link={true} label={'Sign In'} linkURL={'/Login'} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
