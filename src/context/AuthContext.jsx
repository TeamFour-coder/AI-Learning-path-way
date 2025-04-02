// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

// Create auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);
  
  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authService.login({ email, password });
      const { student, token } = result;
      
      // Save user data and token
      setCurrentUser(student);
      localStorage.setItem('user', JSON.stringify(student));
      localStorage.setItem('token', token);
      
      return student;
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred during login');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Signup function
  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authService.register(userData);
      const { student, token } = result;
      
      // Save user data
      setCurrentUser(student);
      localStorage.setItem('user', JSON.stringify(student));
      localStorage.setItem('token', token);
      
      return student;
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred during signup');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  
  // Update user profile
  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to update the user profile
      // This would require creating an endpoint in your backend
      const updatedUser = {
        ...currentUser,
        ...updates
      };
      
      // Save updated user data
      setCurrentUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred during profile update');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Context value
  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};