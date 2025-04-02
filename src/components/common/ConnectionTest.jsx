// src/components/common/ConnectionTest.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ConnectionTest = () => {
  const [status, setStatus] = useState('Checking connection...');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkConnection();
  }, []);
  
  const checkConnection = async () => {
    try {
      setLoading(true);
      
      // Try to fetch courses as a simple connection test
      await api.get('/courses');
      
      setStatus('Connected to backend successfully!');
      setError(null);
    } catch (err) {
      console.error('Connection error:', err);
      setStatus('Failed to connect to backend');
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-2">Backend Connection Status</h3>
      <div className="flex items-center">
        <div 
          className={`w-3 h-3 rounded-full mr-2 ${
            loading ? 'bg-yellow-500' : 
            error ? 'bg-red-500' : 'bg-green-500'
          }`}
        ></div>
        <span>{status}</span>
      </div>
      {error && (
        <div className="mt-2 text-sm text-red-600">
          <p>Error: {error}</p>
          <p className="mt-1">
            Make sure your backend server is running at {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}
          </p>
        </div>
      )}
      <button
        onClick={checkConnection}
        className="mt-3 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? 'Testing...' : 'Test Again'}
      </button>
    </div>
  );
};

export default ConnectionTest;