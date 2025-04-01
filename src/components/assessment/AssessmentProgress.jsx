import React from 'react';
import { FaCheck, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AssessmentProgress = ({
  currentQuestion,
  totalQuestions,
  timeLeft,
  answeredQuestions = [],
  className = '',
}) => {
  // Format time in minutes and seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
        <div className="mb-3 md:mb-0">
          <h3 className="text-lg font-semibold text-gray-800">Assessment Progress</h3>
          <p className="text-gray-600">
            Question {currentQuestion} of {totalQuestions}
          </p>
        </div>
        
        <div className="flex items-center text-gray-700">
          <FaClock className="mr-2 text-indigo-600" />
          <div>
            <p className="font-medium">Time Remaining</p>
            <p className="text-xl font-bold">{formatTime(timeLeft)}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div 
            className="bg-indigo-600 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      </div>
      
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 mt-4">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <div
            key={i}
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
              i + 1 === currentQuestion
                ? 'bg-indigo-600 text-white border-2 border-indigo-300'
                : answeredQuestions.includes(i + 1)
                ? 'bg-green-100 text-green-800 border border-green-300'
                : i + 1 < currentQuestion
                ? 'bg-gray-100 text-gray-500 border border-gray-300'
                : 'bg-gray-50 text-gray-400 border border-gray-200'
            }`}
          >
            {answeredQuestions.includes(i + 1) ? <FaCheck size={12} /> : i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentProgress;
