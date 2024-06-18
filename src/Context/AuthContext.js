import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  const login = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/email/${email}`);
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.get('http://localhost:5000/users/logout');
      setIsLoggedIn(false);
      setUser({});
      localStorage.removeItem('user');
      localStorage.removeItem('userType'); // Clear userType on logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateUserEmail = (newEmail) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, email: newEmail };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUserEmail, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
