import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FaTrophy, FaBook, FaRedo, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ResultsSummary = ({
  score,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  skippedQuestions = 0,
  subjectScores = [],
  onViewDetails,
  onRetakeAssessment,
  onContinue,
  className = '',
}) => {
  // Calculate percentage score
  const percentageScore = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Data for the pie chart
  const data = [
    { name: 'Correct', value: correctAnswers },
    { name: 'Incorrect', value: incorrectAnswers },
    { name: 'Skipped', value: skippedQuestions },
  ];
  
  // Colors for the pie chart
  const COLORS = ['#10B981', '#EF4444', '#9CA3AF'];
  
  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="bg-indigo-600 text-white p-6">
        <h2 className="text-2xl font-bold">Assessment Results</h2>
        <p className="text-indigo-200">You've completed the assessment. Here's how you did:</p>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block relative">
                  <svg className="w-32 h-32">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                    <motion.circle
                      className="text-indigo-600"
                      strokeWidth="8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                      initial={{ strokeDasharray: "350 350", strokeDashoffset: 350 }}
                      animate={{ strokeDashoffset: 350 - (350 * percentageScore) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <p className="text-3xl font-bold text-gray-800">{percentageScore}%</p>
                      <p className="text-sm text-gray-500">Score</p>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-2">
                <span className="font-bold text-gray-800">{correctAnswers}</span> out of <span className="font-bold text-gray-800">{totalQuestions}</span> correct
              </p>
              
              {/* Performance rating based on score */}
              <div className="mb-4">
                {percentageScore >= 90 ? (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                    <FaTrophy className="mr-1 text-yellow-500" />
                    <span className="font-medium">Excellent</span>
                  </div>
                ) : percentageScore >= 75 ? (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    <FaTrophy className="mr-1 text-blue-500" />
                    <span className="font-medium">Good</span>
                  </div>
                ) : percentageScore >= 60 ? (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                    <FaBook className="mr-1" />
                    <span className="font-medium">Satisfactory</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800">
                    <FaBook className="mr-1" />
                    <span className="font-medium">Needs Improvement</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 md:pl-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Answer Breakdown</h3>
            
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {subjectScores.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Performance by Subject</h3>
                <div className="space-y-3">
                  {subjectScores.map((subject, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                        <span className="text-sm font-medium text-gray-700">{subject.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            subject.score >= 80 ? 'bg-green-600' :
                            subject.score >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`} 
                          style={{ width: `${subject.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onViewDetails}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View Detailed Results
            </button>
            <button
              onClick={onRetakeAssessment}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FaRedo className="mr-2" />
              Retake Assessment
            </button>
            <button
              onClick={onContinue}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Continue to Recommendations
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;