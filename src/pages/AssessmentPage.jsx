import React, { useState, useEffect } from 'react';
import { FaSearch, FaClipboardList, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const AssessmentsPage = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [filteredAssessments, setFilteredAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulating API call to fetch assessments
    setTimeout(() => {
      const mockAssessments = [
        {
          id: 1,
          title: 'Mathematics Pre-Assessment Test',
          description: 'Evaluate your foundational knowledge in mathematics across various topics.',
          subject: 'Mathematics',
          duration: '60 minutes',
          totalQuestions: 50,
          icon: <FaChartLine className="w-12 h-12 text-indigo-600" />,
          route: 'mathematics'
        },
        {
          id: 2,
          title: 'Physics Pre-Assessment Test',
          description: 'Assess your understanding of fundamental physics concepts and principles.',
          subject: 'Physics',
          duration: '60 minutes',
          totalQuestions: 50,
          icon: <FaClipboardList className="w-12 h-12 text-green-600" />,
          route: 'physics'
        },
        {
          id: 3,
          title: 'Chemistry Pre-Assessment Test',
          description: 'Test your prior knowledge of chemical concepts and scientific reasoning.',
          subject: 'Chemistry',
          duration: '60 minutes',
          totalQuestions: 50,
          icon: <FaChartLine className="w-12 h-12 text-orange-600" />,
          route: 'chemistry'
        },
        {
          id: 4,
          title: 'Biology Pre-Assessment Test',
          description: 'Explore your baseline understanding of biological sciences and natural systems.',
          subject: 'Biology',
          duration: '60 minutes',
          totalQuestions: 50,
          icon: <FaClipboardList className="w-12 h-12 text-purple-600" />,
          route: 'biology'
        }
      ];
      
      setAssessments(mockAssessments);
      setFilteredAssessments(mockAssessments);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter assessments based on search term
    if (searchTerm) {
      const filtered = assessments.filter(assessment => 
        assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAssessments(filtered);
    } else {
      setFilteredAssessments(assessments);
    }
  }, [searchTerm, assessments]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const AssessmentCard = ({ assessment }) => {
    const handleBeginAssessment = () => {
      navigate(`/assessment/${assessment.route}`);
    };

    return (
      <motion.div 
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="p-6">
          <div className="flex items-center mb-4">
            {assessment.icon}
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
              <p className="text-sm text-gray-500">{assessment.subject}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{assessment.description}</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div>
              <span className="font-medium">Duration:</span> {assessment.duration}
            </div>
            <div>
              <span className="font-medium">Total Questions:</span> {assessment.totalQuestions}
            </div>
          </div>
          <button 
            className="mt-4 w-full btn btn-primary"
            onClick={handleBeginAssessment}
          >
            Begin Pre-Assessment
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-indigo-700 rounded-xl p-8 mb-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white mb-4">Pre-Assessment Tests</h1>
            <p className="text-indigo-100 mb-6">
              Discover your current knowledge level with our comprehensive pre-assessment tests. 
              These tests help identify your existing understanding and areas for potential improvement.
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full bg-white pl-10 pr-3 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                placeholder="Search for pre-assessment tests..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm h-96 animate-pulse"
              >
                <div className="p-6">
                  <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                  <div className="h-10 bg-gray-300 rounded mt-6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredAssessments.map(assessment => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentsPage;