// src/services/api.js
import axios from 'axios';

// Create base API instance
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to request headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle session expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  register: async (userData) => {
    const response = await api.post('/students/register', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/students/login', credentials);
    return response.data;
  }
};

// Course services
export const courseService = {
  getAllCourses: async () => {
    const response = await api.get('/courses');
    return response.data;
  },
  
  getCourseById: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
  
  enrollInCourse: async (studentId, courseId) => {
    const response = await api.post('/students/enroll', { studentId, courseId });
    return response.data;
  }
};

// Assessment services
export const assessmentService = {
  getPreAssessment: async () => {
    const response = await api.get('/questions');
    return response.data.filter(question => question.difficultyLevel === "Easy" || question.difficultyLevel === "Medium");
  },
  
  getPostAssessment: async () => {
    const response = await api.get('/questions');
    return response.data.filter(question => question.difficultyLevel === "Medium" || question.difficultyLevel === "Hard");
  },
  
  submitAssessment: async (assessmentData) => {
    const response = await api.post('/assessments', assessmentData);
    return response.data;
  }
};

// User/student services
export const userService = {
  getStudentById: async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },
  
  getUserCourses: async (id) => {
    const student = await userService.getStudentById(id);
    return student.courses || [];
  },
  
  getUserAssessments: async (id) => {
    const student = await userService.getStudentById(id);
    return student.assessments || [];
  }
};

export default api;