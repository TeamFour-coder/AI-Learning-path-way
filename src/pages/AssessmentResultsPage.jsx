import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Award, Check, X, BarChart2, Clock, ArrowRight } from 'lucide-react';

const AssessmentResultsPage = () => {
  const { sub } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Get results from location state (passed from assessment page)
  const { score, total, answers } = location.state || { score: 0, total: 0, answers: {} };
  
  // Calculate percentage
  const percentage = Math.round((score / total) * 100);
  
  // Subject information from the assessment page
  const subjectInfo = {
    mathematics: {
      title: 'Mathematics Assessment',
      passingScore: 60,
      nextSteps: 'Review algebra and geometry concepts'
    },
    physics: {
      title: 'Physics Assessment',
      passingScore: 60,
      nextSteps: 'Focus on mechanics and energy conservation'
    },
    chemistry: {
      title: 'Chemistry Assessment',
      passingScore: 60,
      nextSteps: 'Review periodic table and chemical reactions'
    },
    biology: {
      title: 'Biology Assessment',
      passingScore: 60,
      nextSteps: 'Study cell biology and genetics'
    }
  };
  
  // Get the current subject info
  const currentSubject = subjectInfo[sub.toLowerCase()] || {
    title: `${sub} Assessment`,
    passingScore: 60,
    nextSteps: 'Review course materials'
  };
  
  // Check if passed
  const passed = percentage >= currentSubject.passingScore;
  
  // Simulate loading
  useEffect(() => {
    if (!location.state) {
      // If no results data, redirect to assessment selection
      navigate('/assessment');
      return;
    }
    
    // Simulate loading for a better user experience
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [location.state, navigate]);
  
  // Performance categories
  const getPerformanceCategory = () => {
    if (percentage >= 90) return { label: 'Excellent', color: 'text-green-600' };
    if (percentage >= 80) return { label: 'Very Good', color: 'text-green-500' };
    if (percentage >= 70) return { label: 'Good', color: 'text-blue-500' };
    if (percentage >= 60) return { label: 'Satisfactory', color: 'text-yellow-500' };
    if (percentage >= 50) return { label: 'Needs Improvement', color: 'text-orange-500' };
    return { label: 'Unsatisfactory', color: 'text-red-500' };
  };
  
  const performance = getPerformanceCategory();
  
  // Mock category scores
  const categoryScores = {
    mathematics: [
      { name: 'Algebra', score: Math.min(100, Math.round(percentage + Math.random() * 10 - 5)) },
      { name: 'Geometry', score: Math.min(100, Math.round(percentage + Math.random() * 10 - 5)) },
      { name: 'Calculus', score: Math.min(100, Math.round(percentage + Math.random() * 15 - 10)) },
      { name: 'Statistics', score: Math.min(100, Math.round(percentage + Math.random() * 12 - 7)) }
    ],
    physics: [
      { name: 'Mechanics', score: Math.min(100, Math.round(percentage + Math.random() * 10 - 5)) },
      { name: 'Electricity', score: Math.min(100, Math.round(percentage + Math.random() * 10 - 5)) },
      { name: 'Waves', score: Math.min(100, Math.round(percentage + Math.random() * 15 - 10)) },
      { name: 'Thermodynamics', score: Math.min(100, Math.round(percentage + Math.random() * 12 - 7)) }
    ],
    chemistry: [
      { name: 'Periodic Table', score: Math.min(100, Math.round(percentage + Math.random() * 10 - 5)) },
      { name: 'Reactions', score: Math.min(100, Math.round(percentage + Math.random() * 10 - 5)) },
      { name: 'Organic Chemistry', score: Math.min(100, Math.round(percentage + Math.random() * 15 - 10)) },
      { name: 'Solutions', score: Math.min(100, Math.round(percentage + Math.random() * 12 - 7)) }
    ],
    biology: [
      { name: 'Cell Biology', score: Math.min(100, Math.round(percentage + Math.random() * 10 - 5)) },
      { name: 'Genetics', score: Math.min(100, Math.round(percentage + Math.random() * 10 - 5)) },
      { name: 'Ecology', score: Math.min(100, Math.round(percentage + Math.random() * 15 - 10)) },
      { name: 'Physiology', score: Math.min(100, Math.round(percentage + Math.random() * 12 - 7)) }
    ]
  };
  
  // Get categories for current subject
  const currentCategories = categoryScores[sub.toLowerCase()] || [];
  
  // Generate recommendations based on category scores
  const getRecommendations = () => {
    // Find the lowest scoring categories
    const sortedCategories = [...currentCategories].sort((a, b) => a.score - b.score);
    const lowestCategories = sortedCategories.slice(0, 2);
    
    return lowestCategories.map(category => ({
      category: category.name,
      recommendation: `Review ${category.name} concepts and practice additional problems.`
    }));
  };
  
  const recommendations = getRecommendations();
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <Award className="w-16 h-16 text-blue-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-400">Calculating Results...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Result Header */}
        <div className={`p-6 ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{currentSubject.title} Results</h1>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">Completed on {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        {/* Score Summary */}
        <div className="flex flex-col md:flex-row border-b">
          <div className="flex-1 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r">
            <div className="relative">
              <div className="w-32 h-32 rounded-full flex items-center justify-center border-8 border-gray-200">
                <div 
                  className={`w-full h-full rounded-full absolute top-0 left-0 border-8 ${
                    passed ? 'border-green-500' : 'border-red-500'
                  }`}
                  style={{ 
                    clipPath: `polygon(50% 50%, 50% 0%, ${percentage > 0 ? '100%' : '50%'} 0%)`,
                    transform: `rotate(${Math.min(360, (percentage / 100) * 360)}deg)`
                  }}
                ></div>
                <span className="text-3xl font-bold">{percentage}%</span>
              </div>
            </div>
            <p className={`mt-4 font-semibold text-lg ${performance.color}`}>{performance.label}</p>
            <p className="text-sm text-gray-500 mt-1">{score} correct out of {total} questions</p>
          </div>
          
          <div className="flex-1 p-6">
            <h2 className="text-lg font-semibold mb-4">Performance by Category</h2>
            <div className="space-y-3">
              {currentCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category.name}</span>
                    <span className="font-medium">{category.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`rounded-full h-2 ${
                        category.score >= 70 ? 'bg-green-500' : 
                        category.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recommendations Section */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Recommended Next Steps</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 mb-3">{currentSubject.nextSteps}</p>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                  <span><strong>{rec.category}:</strong> {rec.recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="p-6 flex flex-wrap gap-4">
          <button 
            onClick={() => navigate(`/assessment/${sub}`)} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
          >
            <BarChart2 className="w-4 h-4 mr-2" />
            Retake Assessment
          </button>
          <button 
            onClick={() => navigate('/assessment')} 
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
          >
            Back to Assessments
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResultsPage;