import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

/**
 * Custom hook for accessing user data and functionality
 * 
 * @returns {Object} User methods and state
 */
const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};

export default useUser;