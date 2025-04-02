import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const QuestionCard = ({ 
  question, 
  onAnswerSubmit,
  showResults = false,
  className = '' 
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleOptionSelect = (optionId) => {
    if (isSubmitted) return;
    setSelectedOption(optionId);
  };
  
  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    
    setIsSubmitted(true);
    
    if (onAnswerSubmit) {
      onAnswerSubmit(question.id, selectedOption);
    }
  };
  
  // Determine if the answer was correct (only relevant when showing results)
  const isCorrect = showResults && selectedOption === question.correctAnswer;
  
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-sm p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-2 flex items-center space-x-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          question.subject === 'Mathematics' ? 'bg-blue-100 text-blue-800' :
          question.subject === 'Physics' ? 'bg-orange-100 text-orange-800' :
          question.subject === 'Chemistry' ? 'bg-green-100 text-green-800' :
          question.subject === 'Biology' ? 'bg-purple-100 text-purple-800' :
          question.subject === 'English' ? 'bg-pink-100 text-pink-800' :
          'bg-indigo-100 text-indigo-800'
        }`}>
          {question.subject}
        </span>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
          question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {question.difficulty}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-4">{question.question}</h3>
      
      <div className="space-y-3 mb-6">
        {question.options.map((option) => (
          <div 
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedOption === option.id
                ? showResults
                  ? option.id === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-indigo-600 bg-indigo-50'
                : showResults && option.id === question.correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                selectedOption === option.id
                  ? showResults
                    ? option.id === question.correctAnswer
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-red-500 bg-red-500 text-white'
                    : 'border-indigo-600 bg-indigo-600 text-white'
                  : showResults && option.id === question.correctAnswer
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300'
              }`}>
                {showResults && (
                  selectedOption === option.id
                    ? option.id === question.correctAnswer
                      ? <FaCheck size={12} />
                      : <FaTimes size={12} />
                    : option.id === question.correctAnswer
                      ? <FaCheck size={12} />
                      : null
                )}
                {!showResults && selectedOption === option.id && <div className="w-3 h-3 bg-white rounded-full"></div>}
              </div>
              <span className="ml-2 text-gray-800">{option.text}</span>
            </div>
          </div>
        ))}
      </div>
      
      {showResults && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          <h4 className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'} mb-2`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </h4>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}
      
      {!showResults && (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null || isSubmitted}
          className={`mt-2 px-4 py-2 rounded-lg font-medium ${
            selectedOption === null || isSubmitted
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isSubmitted ? 'Submitted' : 'Submit Answer'}
        </button>
      )}
    </motion.div>
  );
};

export default QuestionCard;
