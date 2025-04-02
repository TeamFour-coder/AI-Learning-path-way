// src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { userService, courseService, assessmentService } from '../services/api';

// Create user context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  
  const [userProgress, setUserProgress] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [userAssessments, setUserAssessments] = useState([]);
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch user data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    } else {
      // Reset state when user logs out
      setUserProgress(null);
      setUserCourses([]);
      setUserAssessments([]);
      setUserRecommendations([]);
      setLoading(false);
    }
  }, [currentUser]);
  
  // Function to fetch user data from API
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentUser || !currentUser.id) {
        throw new Error('User not authenticated');
      }
      
      // Fetch user courses
      const courses = await userService.getUserCourses(currentUser.id);
      setUserCourses(courses);
      
      // Fetch user assessments
      const assessments = await userService.getUserAssessments(currentUser.id);
      setUserAssessments(assessments);
      
      // Calculate progress based on courses and assessments
      // This is a simplified calculation, you might want to adjust it based on your requirements
      const totalCourses = courses.length;
      const completedCourses = courses.filter(course => course.progress === 100).length;
      const overallProgress = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;
      
      // Generate progress data
      const mockProgressData = {
        overall: Math.round(overallProgress),
        bySubject: {
          Mathematics: calculateSubjectProgress(courses, assessments, 'Mathematics'),
          Physics: calculateSubjectProgress(courses, assessments, 'Physics'),
          Chemistry: calculateSubjectProgress(courses, assessments, 'Chemistry'),
          Biology: calculateSubjectProgress(courses, assessments, 'Biology'),
          English: calculateSubjectProgress(courses, assessments, 'English'),
          'Computer Science': calculateSubjectProgress(courses, assessments, 'Computer Science')
        },
        history: generateProgressHistory(assessments)
      };
      
      setUserProgress(mockProgressData);
      
      // Generate recommendations based on assessments and courses
      const mockRecommendations = generateRecommendations(courses, assessments);
      setUserRecommendations(mockRecommendations);
      
    } catch (error) {
      setError(error.message || 'Failed to fetch user data');
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to calculate progress for a specific subject
  const calculateSubjectProgress = (courses, assessments, subject) => {
    const subjectCourses = courses.filter(course => course.category === subject);
    const subjectAssessments = assessments.filter(assessment => assessment.skillType === subject);
    
    // Calculate average score from assessments
    const totalScore = subjectAssessments.reduce((sum, assessment) => sum + assessment.score, 0);
    const averageScore = subjectAssessments.length > 0 ? totalScore / subjectAssessments.length : 0;
    
    // Calculate course completion
    const totalCourses = subjectCourses.length;
    const completedCourses = subjectCourses.filter(course => course.progress === 100).length;
    const courseCompletionRate = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;
    
    // Combine assessment scores and course completion for overall subject progress
    return Math.round((averageScore + courseCompletionRate) / 2);
  };
  
  // Helper function to generate progress history
  const generateProgressHistory = (assessments) => {
    // Sort assessments by date
    const sortedAssessments = [...assessments].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Group assessments by month
    const groupedByMonth = {};
    sortedAssessments.forEach(assessment => {
      const date = new Date(assessment.date);
      const monthYear = date.toLocaleString('default', { month: 'short' });
      
      if (!groupedByMonth[monthYear]) {
        groupedByMonth[monthYear] = [];
      }
      
      groupedByMonth[monthYear].push(assessment);
    });
    
    // Calculate average score for each month
    return Object.entries(groupedByMonth).map(([month, monthAssessments]) => {
      const totalScore = monthAssessments.reduce((sum, assessment) => sum + assessment.score, 0);
      const averageScore = monthAssessments.length > 0 ? Math.round(totalScore / monthAssessments.length) : 0;
      
      return {
        month,
        score: averageScore
      };
    });
  };
  
  // Helper function to generate recommendations
  const generateRecommendations = (courses, assessments) => {
    // This is a simplified recommendation algorithm
    // In a real application, you would use more complex logic
    
    // For each subject, check assessment scores
    const recommendations = [];
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'];
    
    subjects.forEach(subject => {
      const subjectAssessments = assessments.filter(assessment => assessment.skillType === subject);
      const subjectCourses = courses.filter(course => course.category === subject);
      
      // Calculate average score for the subject
      const totalScore = subjectAssessments.reduce((sum, assessment) => sum + assessment.score, 0);
      const averageScore = subjectAssessments.length > 0 ? totalScore / subjectAssessments.length : 0;
      
      // If score is below 70%, recommend a course for that subject
      if (averageScore < 70) {
        // Check if user is already enrolled in a course for this subject
        const isEnrolled = subjectCourses.length > 0;
        
        if (!isEnrolled) {
          // Add a recommendation
          recommendations.push({
            id: recommendations.length + 1,
            title: `${subject} Fundamentals`,
            category: subject,
            difficulty: averageScore < 40 ? 'Beginner' : 'Intermediate',
            description: `Based on your assessment results, we recommend improving your ${subject.toLowerCase()} skills with this course.`,
            matchPercentage: Math.round(100 - averageScore)
          });
        }
      }
    });
    
    return recommendations;
  };
  
  // Function to enroll in a course
  const enrollInCourse = async (courseId) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentUser || !currentUser.id) {
        throw new Error('User not authenticated');
      }
      
      const result = await courseService.enrollInCourse(currentUser.id, courseId);
      
      // Update local state
      await fetchUserData();
      
      return result;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to enroll in course');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Function to submit assessment
  const completeAssessment = async (assessmentData) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentUser || !currentUser.id) {
        throw new Error('User not authenticated');
      }
      
      // Add student ID to assessment data
      const data = {
        ...assessmentData,
        studentId: currentUser.id
      };
      
      const result = await assessmentService.submitAssessment(data);
      
      // Update local state
      await fetchUserData();
      
      return result;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to complete assessment');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Context value
  const value = {
    userProgress,
    userCourses,
    userAssessments,
    userRecommendations,
    loading,
    error,
    completeAssessment,
    enrollInCourse,
    refreshUserData: fetchUserData
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};