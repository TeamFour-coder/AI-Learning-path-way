import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCheck, FaInfoCircle, FaClock } from 'react-icons/fa';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import QuestionCard from '../components/assessment/QuestionCard.jsx';
import AssessmentProgress from '../components/assessment/AssessmentProgress';

const PreAssessmentPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  
  // Mock assessment data - would come from API
  const assessmentSteps = [
    {
      type: 'intro',
      title: 'Pre-Assessment Test',
      description: 'This assessment will help us understand your current level and create a personalized learning path for you. The test consists of questions across different subjects and should take about 30 minutes to complete.'
    },
    {
      type: 'question',
      id: 'q1',
      subject: 'Mathematics',
      question: 'Solve for x: 2x + 5 = 13',
      options: [
        { id: 'a', text: 'x = 4' },
        { id: 'b', text: 'x = 6' },
        { id: 'c', text: 'x = 8' },
        { id: 'd', text: 'x = 9' }
      ],
      correctAnswer: 'a',
      explanation: 'To solve for x, subtract 5 from both sides: 2x = 8. Then divide both sides by 2: x = 4.',
      difficulty: 'Easy'
    },
    {
      type: 'question',
      id: 'q2',
      subject: 'Physics',
      question: 'Which of the following is NOT a vector quantity?',
      options: [
        { id: 'a', text: 'Velocity' },
        { id: 'b', text: 'Displacement' },
        { id: 'c', text: 'Speed' },
        { id: 'd', text: 'Force' }
      ],
      correctAnswer: 'c',
      explanation: 'Speed is a scalar quantity as it only has magnitude, not direction. Velocity, displacement, and force are all vector quantities with both magnitude and direction.',
      difficulty: 'Medium'
    },
    {
      type: 'question',
      id: 'q3',
      subject: 'Chemistry',
      question: 'What is the chemical formula for water?',
      options: [
        { id: 'a', text: 'H2O' },
        { id: 'b', text: 'CO2' },
        { id: 'c', text: 'NaCl' },
        { id: 'd', text: 'O2' }
      ],
      correctAnswer: 'a',
      explanation: 'Water consists of two hydrogen atoms and one oxygen atom, giving it the chemical formula H2O.',
      difficulty: 'Easy'
    },
    {
      type: 'question',
      id: 'q4',
      subject: 'Mathematics',
      question: 'Find the derivative of f(x) = x³ + 2x² - 4x + 7',
      options: [
        { id: 'a', text: '3x² + 4x - 4' },
        { id: 'b', text: '3x² + 4x + 7' },
        { id: 'c', text: '3x² + 4x - 4 + 7' },
        { id: 'd', text: '3x² + 2x - 4' }
      ],
      correctAnswer: 'a',
      explanation: 'Using the power rule for differentiation: f\'(x) = 3x² + 4x - 4. The derivative of a constant (7) is 0.',
      difficulty: 'Hard'
    },
    {
      type: 'question',
      id: 'q5',
      subject: 'Computer Science',
      question: 'Which data structure operates on a First-In-First-Out (FIFO) principle?',
      options: [
        { id: 'a', text: 'Stack' },
        { id: 'b', text: 'Queue' },
        { id: 'c', text: 'Tree' },
        { id: 'd', text: 'Graph' }
      ],
      correctAnswer: 'b',
      explanation: 'A queue follows the First-In-First-Out (FIFO) principle, where the first element added is the first one to be removed. A stack operates on Last-In-First-Out (LIFO).',
      difficulty: 'Medium'
    },
    {
      type: 'question',
      id: 'q6',
      subject: 'English',
      question: 'Which of the following is NOT a type of figurative language?',
      options: [
        { id: 'a', text: 'Metaphor' },
        { id: 'b', text: 'Simile' },
        { id: 'c', text: 'Exposition' },
        { id: 'd', text: 'Personification' }
      ],
      correctAnswer: 'c',
      explanation: 'Exposition is a literary device used to provide background information to the reader about the setting, characters, or events. It is not a type of figurative language. Metaphor, simile, and personification are all types of figurative language.',
      difficulty: 'Medium'
    },
    {
      type: 'question',
      id: 'q7',
      subject: 'Biology',
      question: 'Which organelle is known as the "powerhouse of the cell"?',
      options: [
        { id: 'a', text: 'Nucleus' },
        { id: 'b', text: 'Mitochondria' },
        { id: 'c', text: 'Endoplasmic Reticulum' },
        { id: 'd', text: 'Golgi Apparatus' }
      ],
      correctAnswer: 'b',
      explanation: 'Mitochondria are known as the "powerhouse of the cell" because they generate most of the cell\'s supply of adenosine triphosphate (ATP), which is used as a source of chemical energy.',
      difficulty: 'Easy'
    },
    {
      type: 'question',
      id: 'q8',
      subject: 'Mathematics',
      question: 'What is the value of sin(30°)?',
      options: [
        { id: 'a', text: '0' },
        { id: 'b', text: '0.5' },
        { id: 'c', text: '1' },
        { id: 'd', text: '√3/2' }
      ],
      correctAnswer: 'b',
      explanation: 'The value of sin(30°) is 0.5 or 1/2. This is one of the standard trigonometric values that should be memorized.',
      difficulty: 'Medium'
    },
    {
      type: 'question',
      id: 'q9',
      subject: 'Chemistry',
      question: 'What is the pH value of a neutral solution?',
      options: [
        { id: 'a', text: '0' },
        { id: 'b', text: '7' },
        { id: 'c', text: '14' },
        { id: 'd', text: '1' }
      ],
      correctAnswer: 'b',
      explanation: 'A neutral solution has a pH value of 7. Solutions with pH values less than 7 are acidic, while those with pH values greater than 7 are alkaline (basic).',
      difficulty: 'Easy'
    },
    {
      type: 'question',
      id: 'q10',
      subject: 'Physics',
      question: 'What is the formula for calculating work done?',
      options: [
        { id: 'a', text: 'W = m × g' },
        { id: 'b', text: 'W = F × d' },
        { id: 'c', text: 'W = m × v²' },
        { id: 'd', text: 'W = P × t' }
      ],
      correctAnswer: 'b',
      explanation: 'Work done (W) is calculated as force (F) multiplied by the displacement (d) in the direction of the force: W = F × d.',
      difficulty: 'Medium'
    },
    {
      type: 'completion',
      title: 'Assessment Complete!',
      description: 'Thank you for completing the pre-assessment. We are now analyzing your responses to create your personalized learning pathway.'
    }
  ];
  
  useEffect(() => {
    let timer;
    if (assessmentStarted && currentStep > 0 && currentStep < assessmentSteps.length - 1) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Auto-submit when time expires
            setCurrentStep(assessmentSteps.length - 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [assessmentStarted, currentStep, assessmentSteps.length]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleStartAssessment = () => {
    setAssessmentStarted(true);
    setCurrentStep(1);
  };
  
  const handleAnswerSubmit = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };
  
  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    // In a real app, we would submit answers to the backend
    // For now, just go to completion screen
    setCurrentStep(assessmentSteps.length - 1);
  };
  
  const currentContent = assessmentSteps[currentStep];
  const isQuestionStep = currentContent?.type === 'question';
  
  // For the question steps, determine the question number
  const questionNumber = isQuestionStep ? 
    assessmentSteps.filter(step => step.type === 'question' && step.id <= currentContent.id).length : 0;
  
  const totalQuestions = assessmentSteps.filter(step => step.type === 'question').length;
  
  // Get a list of answered question indices
  const answeredQuestions = Object.keys(answers).map(id => {
    const index = assessmentSteps.findIndex(step => step.id === id);
    return index;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress bar - only show when assessment started */}
        {assessmentStarted && currentStep > 0 && currentStep < assessmentSteps.length - 1 && (
          <AssessmentProgress 
            currentQuestion={questionNumber}
            totalQuestions={totalQuestions}
            timeLeft={timeLeft}
            answeredQuestions={answeredQuestions}
            className="mb-8"
          />
        )}
        
        <div className="max-w-3xl mx-auto">
          {currentContent.type === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{currentContent.title}</h1>
                <div className="text-lg text-gray-600 mb-8">{currentContent.description}</div>
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="text-indigo-600 mt-1">
                      <FaInfoCircle size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-indigo-800 mb-1">Important Information</h3>
                      <ul className="text-sm text-indigo-700 space-y-1 list-disc pl-5">
                        <li>You will have 30 minutes to complete the assessment</li>
                        <li>Answer all questions to get the most accurate learning path</li>
                        <li>You can go back to previous questions during the test</li>
                        <li>Your results will be available immediately after completion</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleStartAssessment}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Start Assessment
                </button>
              </div>
            </motion.div>
          )}
          
          {currentContent.type === 'question' && (
            <div>
              <QuestionCard 
                question={currentContent}
                onAnswerSubmit={handleAnswerSubmit}
                className="mb-6"
              />
              
              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <FaArrowLeft size={14} />
                  <span>Previous</span>
                </button>
                
                {currentStep < assessmentSteps.length - 2 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                    disabled={!answers[currentContent.id]}
                  >
                    <span>Next</span>
                    <FaArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Submit Assessment
                  </button>
                )}
              </div>
            </div>
          )}
          
          {currentContent.type === 'completion' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-sm text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck size={32} className="text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{currentContent.title}</h1>
              <p className="text-lg text-gray-600 mb-8">{currentContent.description}</p>
              
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <motion.div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                  ></motion.div>
                </div>
                <span className="text-sm text-gray-500">Analyzing your responses...</span>
              </div>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Your Learning Path
              </button>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PreAssessmentPage;