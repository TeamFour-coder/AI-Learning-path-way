import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaClock, FaClipboardList } from 'react-icons/fa';

// Terms and Conditions Component
const assessmentpolicies = ({ assessment, onAccept }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const examPolicies = [
    {
      id: 1,
      icon: <FaTimesCircle className="text-red-500 w-6 h-6" />,
      title: "No Cheating",
      description: "Any form of cheating, including using external resources, copying, or seeking help from others, is strictly prohibited. Violation will result in immediate disqualification."
    },
    {
      id: 2,
      icon: <FaClock className="text-blue-500 w-6 h-6" />,
      title: "Time Management",
      description: `The exam duration is ${assessment.duration}. Once started, the timer will count down. The exam will be automatically submitted when the time expires.`
    },
    {
      id: 3,
      icon: <FaClipboardList className="text-green-500 w-6 h-6" />,
      title: "Exam Structure",
      description: `The assessment consists of ${assessment.totalQuestions} multiple-choice questions. Each question carries equal marks.`
    },
    {
      id: 4,
      icon: <FaCheckCircle className="text-purple-500 w-6 h-6" />,
      title: "Technical Guidelines",
      description: "Ensure a stable internet connection. Do not refresh or close the browser during the exam. Technical issues may lead to exam termination."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <motion.div 
        className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {assessment.title} - Terms and Conditions
        </h1>
        
        <div className="space-y-4 mb-6">
          {examPolicies.map((policy) => (
            <div key={policy.id} className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg">
              <div>{policy.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-800">{policy.title}</h3>
                <p className="text-gray-600 text-sm">{policy.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center mb-6">
          <input 
            type="checkbox" 
            id="agree-terms"
            checked={isAgreed}
            onChange={() => setIsAgreed(!isAgreed)}
            className="mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="agree-terms" className="text-sm text-gray-900">
            I have read and agree to the exam terms and conditions
          </label>
        </div>

        <button 
          onClick={() => isAgreed && onAccept()}
          disabled={!isAgreed}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
            isAgreed 
              ? 'bg-indigo-600 hover:bg-indigo-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Start Exam
        </button>
      </motion.div>
    </div>
  );
};

export default assessmentpolicies;