import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext.jsx';
import useAuth from './hooks/useAuth';

// Common components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';






// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const PreAssessmentPage = lazy(() => import('./pages/PreAssessmentPage'));
const AssessmentPage = lazy(() => import('./pages/AssessmentPage'));
const PostAssessmentPage = lazy(() => import('./pages/PostAssessmentPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const StartAssessPage = lazy(() => import('./pages/StartAssessPage.jsx'))
const AssessmentResultsPage = lazy(() => import('./pages/AssessmentResultsPage.jsx'));


// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner fullScreen />;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Main layout component with Navbar and Footer
const MainLayout = ({ children, hideFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
};

function App() {
  // App-wide initialization
  useEffect(() => {
    // Add any global initialization here
    
    // Example: Set document title
    document.title = 'Learning Pathways - Personalized Education';
    
    // Example: Add global event listeners
    const handleOnlineStatus = () => {
      console.log(navigator.onLine ? 'Back online' : 'Offline');
      // Could show a toast notification here
    };
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);
  
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={
                <MainLayout>
                  <HomePage />
                </MainLayout>
              } />
              
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              <Route path="/courses" element={
                <MainLayout>
                  <CoursesPage />
                </MainLayout>
              } />
              
              <Route path="/courses/:id" element={
                <MainLayout>
                  <CourseDetailPage />
                </MainLayout>
              } />
              
              <Route path="/assessment" element={
                <MainLayout>
                  <AssessmentPage />
                </MainLayout>
              } />

              <Route path="/assessment/:sub" element={
                <MainLayout>
                  <StartAssessPage />
                </MainLayout>
              } />

              <Route path="/assessment/:sub/results" element={
                <MainLayout>
                  <AssessmentResultsPage />
                </MainLayout>
              } />

              <Route path="/support" element={
                <MainLayout>
                  <SupportPage />
                </MainLayout>
              } />
              
              <Route path="/shop" element={
                <MainLayout>
                  <ShopPage />
                </MainLayout>
              } />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <MainLayout hideFooter>
                    <DashboardPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ProfilePage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/assessment/pre" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PreAssessmentPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/assessment/post" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PostAssessmentPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Catch all - 404 page */}
              <Route path="*" element={
                <MainLayout>
                  <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                    <p className="text-lg text-gray-600 mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                    <button 
                      onClick={() => window.history.back()}
                      className="mr-4 px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      Go Back
                    </button>
                    <a 
                      href="/"
                      className="px-6 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                      Go Home
                    </a>
                  </div>
                </MainLayout>
              } />
            </Routes>
          </Suspense>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
