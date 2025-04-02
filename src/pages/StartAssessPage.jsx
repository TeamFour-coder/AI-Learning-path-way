import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';

const startAssessmentPage = () => {
  const { sub } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [showWarning, setShowWarning] = useState(false);
  
  // Mock assessment questions based on subject
  const [questions, setQuestions] = useState([]);
  
  // Mock data for different subjects
  const subjectQuestions = {
    mathematics: [
      {
        id: 1,
        question: "Solve for x: 2x + 5 = 13",
        options: ["x = 3", "x = 4", "x = 5", "x = 6"],
        correctAnswer: "x = 4"
      },
      {
        id: 2,
        question: "What is the area of a circle with radius 5 units?",
        options: ["25π square units", "10π square units", "5π square units", "20π square units"],
        correctAnswer: "25π square units"
      },
      {
        id: 3,
        question: "Simplify: (3x² + 2x - 5) - (x² - 3x + 2)",
        options: ["2x² + 5x - 7", "4x² - x - 3", "2x² + 5x - 3", "4x² - x - 7"],
        correctAnswer: "2x² + 5x - 7"
      },
      // Additional questions would be loaded here
    ],
    physics: [
      {
        id: 1,
        question: "What is Newton's Second Law of Motion?",
        options: [
          "An object at rest stays at rest unless acted upon by a force",
          "Force equals mass times acceleration (F = ma)",
          "For every action, there is an equal and opposite reaction",
          "Energy cannot be created or destroyed"
        ],
        correctAnswer: "Force equals mass times acceleration (F = ma)"
      },
      {
        id: 2,
        question: "What is the unit of electric current?",
        options: ["Volt", "Watt", "Ampere", "Ohm"],
        correctAnswer: "Ampere"
      },
      {
        id: 3,
        question: "Which of the following is an example of a scalar quantity?",
        options: ["Velocity", "Force", "Displacement", "Temperature"],
        correctAnswer: "Temperature"
      },
      // Additional questions would be loaded here
    ],
    chemistry: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: "Au"
      },
      {
        id: 2,
        question: "What is the pH of a neutral solution at 25°C?",
        options: ["0", "7", "14", "1"],
        correctAnswer: "7"
      },
      {
        id: 3,
        question: "Which of the following is a noble gas?",
        options: ["Chlorine", "Oxygen", "Nitrogen", "Argon"],
        correctAnswer: "Argon"
      },
      // Additional questions would be loaded here
    ],
    biology: [
      {
        id: 1,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Apparatus"],
        correctAnswer: "Mitochondria"
      },
      {
        id: 2,
        question: "Which of the following is NOT a function of the liver?",
        options: ["Detoxification", "Protein synthesis", "Bile production", "Oxygen transport"],
        correctAnswer: "Oxygen transport"
      },
      {
        id: 3,
        question: "Which process do plants use to make their own food?",
        options: ["Respiration", "Photosynthesis", "Fermentation", "Digestion"],
        correctAnswer: "Photosynthesis"
      },
      // Additional questions would be loaded here
    ]
  };

  useEffect(() => {
    // Load questions based on subject
    if (subjectQuestions[sub.toLowerCase()]) {
      setQuestions(subjectQuestions[sub.toLowerCase()]);
      setLoading(false);
    } else {
      navigate('/assessment');
    }
    
    // Timer logic
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitAssessment();
          return 0;
        }
        
        // Show warning when 5 minutes remaining
        if (prev === 300) {
          setShowWarning(true);
        }
        
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [sub, navigate]);
  
  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const handleSelectAnswer = (answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };
  
  const handleSubmitAssessment = () => {
    // Calculate score
    let correctAnswers = 0;
    Object.keys(selectedAnswers).forEach(questionId => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question && selectedAnswers[questionId] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    // Store results or navigate to results page
    navigate(`/assessment/${sub}/results`, { 
      state: { 
        score: correctAnswers,
        total: questions.length,
        answers: selectedAnswers
      } 
    });
  };
  
  // Dismiss the warning
  const dismissWarning = () => {
    setShowWarning(false);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header with timer */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-xl font-bold">{sub.charAt(0).toUpperCase() + sub.slice(1)} Assessment</h1>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-500" />
            <span className={`font-mono font-bold ${timeRemaining < 300 ? 'text-red-500' : ''}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
        
        {/* Progress tracker */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round((Object.keys(selectedAnswers).length / questions.length) * 100)}% Completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 rounded-full h-2" 
              style={{ width: `${(currentQuestion + 1) / questions.length * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Question display */}
        {questions[currentQuestion] && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleSelectAnswer(option)}
                  className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedAnswers[questions[currentQuestion].id] === option 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name={`question-${questions[currentQuestion].id}`}
                      checked={selectedAnswers[questions[currentQuestion].id] === option}
                      onChange={() => handleSelectAnswer(option)}
                      className="mr-3"
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
            className={`flex items-center px-4 py-2 rounded-md ${
              currentQuestion === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </button>
          
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmitAssessment}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit Assessment
            </button>
          )}
        </div>
        
        {/* Question navigator */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Question Navigator</h3>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                  ${currentQuestion === index ? 'bg-blue-500 text-white' : ''}
                  ${selectedAnswers[q.id] ? 'bg-green-100 border border-green-500' : 'bg-gray-100'}
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Time warning modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center text-red-500 mb-4">
              <AlertCircle className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-bold">Time Warning</h2>
            </div>
            <p className="mb-4">You have 5 minutes remaining to complete the assessment. Please finish your answers and submit.</p>
            <button
              onClick={dismissWarning}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Continue Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default startAssessmentPage;