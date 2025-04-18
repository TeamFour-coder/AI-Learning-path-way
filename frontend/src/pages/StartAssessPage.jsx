// import React, { useState, useEffect } from 'react';

// import { useParams, useNavigate } from 'react-router-dom';
// import { Loader2, ChevronLeft, ChevronRight, Clock, BarChart2 } from 'lucide-react';
// import axios from 'axios';

// const StartAssessmentPage = () => {
//   const { sub } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [timeRemaining, setTimeRemaining] = useState(60 * 60);
//   const [showWarning, setShowWarning] = useState(false); // This state is used but not displayed in the UI

//   // Fisher-Yates (Knuth) shuffle algorithm
//   const shuffleArray = (array) => {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   };

//   // Function to get color based on difficulty level
//   const getDifficultyColor = (difficulty) => {
//     if (!difficulty) return "bg-gray-200";
    
//     const level = difficulty.toLowerCase();
//     if (level === "easy") return "bg-green-200 text-green-800";
//     if (level === "medium") return "bg-yellow-200 text-yellow-800";
//     if (level === "hard") return "bg-red-200 text-red-800";
//     return "bg-gray-200";
//   };

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/quiz/${sub.toLowerCase()}`);
//         console.log("Quiz data received:", response.data);
        
//         // Shuffle the questions before setting state
//         const shuffledQuestions = shuffleArray(response.data);
//         setQuestions(shuffledQuestions);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//         navigate("/assessment");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();

//     const timer = setInterval(() => {
//       setTimeRemaining(prev => {
//         if (prev <= 0) {
//           clearInterval(timer);
//           handleSubmitAssessment();
//           return 0;
//         }
//         if (prev === 300) {
//           setShowWarning(true);
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [sub, navigate]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleSelectAnswer = (answerKey) => {
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [questions[currentQuestion].Question]: answerKey, // Store option key (e.g., "Option A")
//     }));
//   };

//   const handleSubmitAssessment = () => {
//     let correctAnswers = 0;
  
//     console.log("Selected Answers:", selectedAnswers);
//     console.log("Question Data:", questions);
  
//     questions.forEach((q) => {
//       const correctAnswer = q["Correct Answer"] || q["correct_answer"] || q["answer"]; // Ensure key exists
//       const selectedOption = selectedAnswers[q.Question]; // e.g., "Option C"
  
//       // Convert "Option C" -> actual answer text ("Virtual and erect" or "Right-angled")
//       const selectedAnswer = selectedOption ? q[selectedOption] : null;
  
//       console.log(`Q: ${q.Question} | Expected: ${correctAnswer}, User: ${selectedAnswer}`);
  
//       // If correctAnswer is a single letter (A, B, C, D), compare with selected option key
//       if (["A", "B", "C", "D"].includes(correctAnswer)) {
//         if (selectedOption && selectedOption.includes(correctAnswer)) {
//           correctAnswers++;
//         }
//       } 
//       // Otherwise, compare actual text values
//       else {
//         if (selectedAnswer && String(selectedAnswer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase()) {
//           correctAnswers++;
//         }
//       }
//     });
  
//     console.log("Final Score:", correctAnswers);
  
//     navigate(`/assessment/${sub}/results`, {
//       state: {
//         score: correctAnswers,
//         total: questions.length,
//         answers: selectedAnswers,
//       },
//     });
//   };
  
  
  

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
//       </div>
//     );
//   }

//   const currentDifficulty = questions[currentQuestion]?.Difficulty || 
//                            questions[currentQuestion]?.difficulty || 
//                            "Not specified";

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-3xl">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <div className="flex justify-between items-center mb-6 border-b pb-4">
//           <h1 className="text-xl font-bold">{sub.charAt(0).toUpperCase() + sub.slice(1)} Assessment</h1>
//           <div className="flex items-center gap-2">
//             <Clock className="w-5 h-5 text-red-500" />
//             <span className={`font-mono font-bold ${timeRemaining < 300 ? 'text-red-500' : ''}`}>
//               {formatTime(timeRemaining)}
//             </span>
//           </div>
//         </div>

//         {questions.length > 0 && (
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-lg font-semibold">
//                 {`Q${currentQuestion + 1}: ${questions[currentQuestion].Question.replace(/^Q\d+: /, '')}`}
//               </h2>
//               <div className="flex items-center">
//                 <BarChart2 className="w-4 h-4 mr-1 text-gray-600" />
//                 <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(currentDifficulty)}`}>
//                   {currentDifficulty}
//                 </span>
//               </div>
//             </div>
//             <div className="space-y-3">
//               {["Option A", "Option B", "Option C", "Option D"].map((key, index) => (
//                 <div 
//                   key={index} 
//                   onClick={() => handleSelectAnswer(key)} // Pass key (Option A, Option B, etc.)
//                   className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
//                     selectedAnswers[questions[currentQuestion].Question] === key 
//                       ? 'border-blue-500 bg-blue-50' 
//                       : 'border-gray-300'
//                   }`}
//                 >
//                   <label className="flex items-center cursor-pointer">
//                     <input 
//                       type="radio" 
//                       name={`question-${currentQuestion}`}
//                       checked={selectedAnswers[questions[currentQuestion].Question] === key} // Compare key
//                       onChange={() => handleSelectAnswer(key)} // Pass key
//                       className="mr-3"
//                     />
//                     {questions[currentQuestion][key]}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex justify-between">
//           <button 
//             onClick={() => setCurrentQuestion(prev => Math.max(prev - 1, 0))} 
//             disabled={currentQuestion === 0}
//             className={`flex items-center px-4 py-2 rounded-md ${currentQuestion === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//           >
//             <ChevronLeft className="w-4 h-4 mr-1" /> Previous
//           </button>
//           {currentQuestion < questions.length - 1 ? (
//             <button 
//               onClick={() => setCurrentQuestion(prev => prev + 1)} 
//               className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Next <ChevronRight className="w-4 h-4 ml-1" />
//             </button>
//           ) : (
//             <button 
//               onClick={handleSubmitAssessment} 
//               className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//             >
//               Submit Assessment
//             </button>
//           )}
//         </div>

//         <div className="mt-6 flex flex-wrap gap-2 justify-center">
//           {questions.map((question, index) => {
//             const difficulty = question.Difficulty || question.difficulty || null;
//             let borderColor = "border-gray-300";
            
//             if (difficulty) {
//               if (difficulty.toLowerCase() === "easy") borderColor = "border-green-500";
//               else if (difficulty.toLowerCase() === "medium") borderColor = "border-yellow-500";
//               else if (difficulty.toLowerCase() === "hard") borderColor = "border-red-500";
//             }
            
//             return (
//               <button 
//                 key={index}
//                 onClick={() => setCurrentQuestion(index)}
//                 className={`w-10 h-10 rounded-full border-2 ${borderColor} ${
//                   currentQuestion === index 
//                     ? 'bg-blue-500 text-white border-blue-500' 
//                     : 'bg-white text-gray-700 hover:bg-gray-100'
//                 } ${selectedAnswers[question.Question] ? 'font-bold' : ''}`}
//               >
//                 {index + 1}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StartAssessmentPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ChevronLeft, ChevronRight, Clock, BarChart2 } from 'lucide-react';
import axios from 'axios';


const StartAssessmentPage = () => {
  const { sub } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(60 * 60);
  const [showWarning, setShowWarning] = useState(false);


  // Fisher-Yates (Knuth) shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  

  // Function to get color based on difficulty level
  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return "bg-gray-200";
    
    const level = difficulty.toLowerCase();
    if (level === "easy") return "bg-green-200 text-green-800";
    if (level === "medium") return "bg-yellow-200 text-yellow-800";
    if (level === "hard") return "bg-red-200 text-red-800";
    return "bg-gray-200";
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quiz/${sub.toLowerCase()}`);
        console.log("First question object:", response.data[0]);

        
        // Shuffle the questions before setting state
        const shuffledQuestions = shuffleArray(response.data);
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        navigate("/assessment");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitAssessment();
          return 0;
        }
        if (prev === 300) {
          setShowWarning(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sub, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (answerKey) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].Question]: answerKey, // Store option key (e.g., "Option A")
    }));
  };

  const handleSubmitAssessment = async () => {
    let correctAnswers = 0;
    const detailedResponses = [];
    
    questions.forEach((q) => {
      const correctAnswer = q["Correct Answer"] || q["correct_answer"] || q["answer"];
      const selectedOption = selectedAnswers[q.Question]; 
      const selectedAnswer = selectedOption ? q[selectedOption] : null;
      
      // Make sure isCorrect is always explicitly a boolean (true or false)
      let isCorrect = false;
      
      if (["A", "B", "C", "D"].includes(correctAnswer)) {
        isCorrect = selectedOption && selectedOption.includes(correctAnswer) ? true : false;
      } else {
        isCorrect = selectedAnswer && 
          String(selectedAnswer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase() ? true : false;
      }
      
      if (isCorrect) correctAnswers++;
      
      // Store detailed response data - ensure isCorrect is always boolean
      detailedResponses.push({
        question: q.Question,
        correctAnswer: correctAnswer || "Not provided",
        userAnswer: selectedAnswer || "Not answered",
        selectedOption: selectedOption || "None",
        isCorrect: isCorrect === true, // Force boolean value
        difficulty: q.Difficulty || q.difficulty || "Not specified"
      });
    });
    
    // Log to check if any items have isCorrect as null
    console.log("Checking response data validity:");
    const anyNullIsCorrect = detailedResponses.some((item, idx) => {
      if (item.isCorrect !== true && item.isCorrect !== false) {
        console.error(`Item at index ${idx} has invalid isCorrect:`, item.isCorrect);
        return true;
      }
      return false;
    });
    
    if (anyNullIsCorrect) {
      alert("There was an issue with the assessment data. Please try again.");
      return;
    }
    
    // Prepare assessment data
    const assessmentData = {
      subject: sub,
      totalQuestions: questions.length,
      correctAnswers,
      score: (correctAnswers / questions.length) * 100,
      timeSpent: 3600 - timeRemaining,
      timestamp: new Date(),
      detailedResponses
    };
    
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error("No authentication token found");
        alert("You must be logged in to submit assessments");
        navigate('/login');
        return;
      }
      
      // Send results to the backend
      await axios.post('http://localhost:5000/api/assessments/submit', 
        assessmentData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Navigate to results page
      navigate(`/assessment/${sub}/results`, {
        state: {
          score: correctAnswers,
          total: questions.length,
          answers: selectedAnswers,
        },
      });
    } catch (error) {
      console.error("Error submitting assessment results:", error);
      
      if (error.response && error.response.data) {
        console.error("Server error details:", error.response.data);
      }
      
      // Handle 401 unauthorized specifically
      if (error.response && error.response.status === 401) {
        alert("Your session has expired. Please log in again.");
        navigate('/login');
      } else {
        alert("Failed to save your assessment results. Please try again.");
      }
    }
  };
  
  
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );
  }

  const currentDifficulty = questions[currentQuestion]?.Difficulty || 
                           questions[currentQuestion]?.difficulty || 
                           "Not specified";

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-xl font-bold">{sub.charAt(0).toUpperCase() + sub.slice(1)} Assessment</h1>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-500" />
            <span className={`font-mono font-bold ${timeRemaining < 300 ? 'text-red-500' : ''}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {questions.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">
                {`Q${currentQuestion + 1}: ${questions[currentQuestion].Question.replace(/^Q\d+: /, '')}`}
              </h2>
              <div className="flex items-center">
                <BarChart2 className="w-4 h-4 mr-1 text-gray-600" />
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(currentDifficulty)}`}>
                  {currentDifficulty}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {["Option A", "Option B", "Option C", "Option D"].map((key, index) => (
                <div 
                  key={index} 
                  onClick={() => handleSelectAnswer(key)} // Pass key (Option A, Option B, etc.)
                  className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedAnswers[questions[currentQuestion].Question] === key 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name={`question-${currentQuestion}`}
                      checked={selectedAnswers[questions[currentQuestion].Question] === key} // Compare key
                      onChange={() => handleSelectAnswer(key)} // Pass key
                      className="mr-3"
                    />
                    {questions[currentQuestion][key]}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button 
            onClick={() => setCurrentQuestion(prev => Math.max(prev - 1, 0))} 
            disabled={currentQuestion === 0}
            className={`flex items-center px-4 py-2 rounded-md ${currentQuestion === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </button>
          {currentQuestion < questions.length - 1 ? (
            <button 
              onClick={() => setCurrentQuestion(prev => prev + 1)} 
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

        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {questions.map((question, index) => {
            const difficulty = question.DifficultyText || question.difficulty || null;
            let borderColor = "border-gray-300";
            
            if (difficulty) {
              if (difficulty.toLowerCase() === "easy") borderColor = "border-green-500";
              else if (difficulty.toLowerCase() === "medium") borderColor = "border-yellow-500";
              else if (difficulty.toLowerCase() === "hard") borderColor = "border-red-500";
            }
            
            return (
              <button 
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-full border-2 ${borderColor} ${
                  currentQuestion === index 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } ${selectedAnswers[question.Question] ? 'font-bold' : ''}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StartAssessmentPage;