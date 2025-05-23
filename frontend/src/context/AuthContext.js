import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Check if user is already logged in from localStorage
  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the configured api instance which already includes the /api prefix
      const { data } = await api.post(
        '/users/login',
        { email, password }
      );
      
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'An error occurred. Please try again.'
      );
      setIsLoading(false);
      throw err;
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the configured api instance here too
      const { data } = await api.post(
        '/users',
        { name, email, password }
      );
      
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'An error occurred. Please try again.'
      );
      setIsLoading(false);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  const updateProfile = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the configured api instance 
      const { data } = await api.put(
        '/users/profile',
        userData
      );
      
      setUserInfo({ ...userInfo, ...data });
      localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...data }));
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'An error occurred. Please try again.'
      );
      setIsLoading(false);
      throw err;
    }
  };

  const uploadProfilePicture = async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the configured api instance with custom headers for file upload
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      
      const { data } = await api.post(
        '/users/profile/picture',
        formData,
        config
      );
      
      setUserInfo({ ...userInfo, profilePicture: data.profilePicture });
      localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, profilePicture: data.profilePicture }));
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'An error occurred. Please try again.'
      );
      setIsLoading(false);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        isLoading,
        error,
        login,
        register,
        logout,
        updateProfile,
        uploadProfilePicture
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
