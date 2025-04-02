import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CourseCard from '../components/courses/CourseCard';
import CourseFilter from '../components/courses/CourseFilter';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('popular');

  useEffect(() => {
    // Simulating API call to fetch courses
    setTimeout(() => {
      // Mock data
      const mockCourses = [
        {
          id: 1,
          title: 'Advanced Mathematics for High School Students',
          description: 'Master advanced mathematical concepts with this comprehensive course designed for high school students preparing for college entrance exams.',
          thumbnail: 'https://placehold.co/600x400/indigo/white?text=Mathematics',
          category: 'Mathematics',
          level: 'Advanced',
          rating: 4.7,
          reviewsCount: 245,
          studentsCount: 12560,
          price: 49.99,
          discountPrice: 39.99,
          duration: '5h 30m',
          instructor: 'Dr. Jane Smith'
        },
        {
          id: 2,
          title: 'Physics Fundamentals: Motion, Energy & Forces',
          description: 'Build a strong foundation in physics principles with practical examples and interactive simulations.',
          thumbnail: 'https://placehold.co/600x400/orange/white?text=Physics',
          category: 'Physics',
          level: 'Intermediate',
          rating: 4.5,
          reviewsCount: 187,
          studentsCount: 8753,
          price: 44.99,
          duration: '7h 45m',
          instructor: 'Prof. Robert Johnson'
        },
        {
          id: 3,
          title: 'Chemistry: Understanding Atomic Structure',
          description: 'Explore the fascinating world of atoms, elements, and chemical reactions in this comprehensive chemistry course.',
          thumbnail: 'https://placehold.co/600x400/green/white?text=Chemistry',
          category: 'Chemistry',
          level: 'Beginner',
          rating: 4.8,
          reviewsCount: 156,
          studentsCount: 5421,
          price: 39.99,
          duration: '6h 15m',
          instructor: 'Dr. Emily Chang'
        },
        {
          id: 4,
          title: 'Introduction to Programming with Python',
          description: 'Learn the fundamentals of programming using Python, one of the most popular and versatile programming languages.',
          thumbnail: 'https://placehold.co/600x400/blue/white?text=Programming',
          category: 'Computer Science',
          level: 'Beginner',
          rating: 4.9,
          reviewsCount: 312,
          studentsCount: 18945,
          price: 54.99,
          discountPrice: 44.99,
          duration: '8h 20m',
          instructor: 'Alex Davidson'
        },
        {
          id: 5,
          title: 'Biology: The Science of Life',
          description: 'Discover the amazing world of living organisms, from cells to ecosystems, in this comprehensive biology course.',
          thumbnail: 'https://placehold.co/600x400/purple/white?text=Biology',
          category: 'Biology',
          level: 'Intermediate',
          rating: 4.6,
          reviewsCount: 203,
          studentsCount: 7629,
          price: 49.99,
          duration: '9h 10m',
          instructor: 'Dr. Sarah Williams'
        },
        {
          id: 6,
          title: 'English Literature: Analyzing Classic Texts',
          description: 'Develop critical reading and analysis skills by studying classic works of literature from different periods and traditions.',
          thumbnail: 'https://placehold.co/600x400/pink/white?text=Literature',
          category: 'English',
          level: 'Advanced',
          rating: 4.7,
          reviewsCount: 175,
          studentsCount: 6234,
          price: 42.99,
          duration: '7h 30m',
          instructor: 'Prof. Michael Taylor'
        },
        {
          id: 7,
          title: 'Statistics and Data Analysis',
          description: 'Learn essential statistical concepts and data analysis techniques used in research, business, and everyday decision-making.',
          thumbnail: 'https://placehold.co/600x400/cyan/white?text=Statistics',
          category: 'Mathematics',
          level: 'Intermediate',
          rating: 4.5,
          reviewsCount: 219,
          studentsCount: 9872,
          price: 0,
          duration: '6h 45m',
          instructor: 'Dr. Kevin Matthews'
        },
        {
          id: 8,
          title: 'Web Development Fundamentals',
          description: 'Build responsive websites from scratch using HTML, CSS, and JavaScript, the core technologies of the web.',
          thumbnail: 'https://placehold.co/600x400/red/white?text=Web+Dev',
          category: 'Computer Science',
          level: 'Beginner',
          rating: 4.8,
          reviewsCount: 287,
          studentsCount: 15623,
          price: 59.99,
          discountPrice: 49.99,
          duration: '10h 15m',
          instructor: 'Jennifer Lee'
        }
      ];
      
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter courses based on search term
    if (searchTerm) {
      const filtered = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  }, [searchTerm, courses]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...filteredCourses];
    
    switch (option) {
      case 'popular':
        sorted.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case 'highestRated':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, you would sort by date
        sorted.sort((a, b) => b.id - a.id);
        break;
      case 'priceLowToHigh':
        sorted.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'priceHighToLow':
        sorted.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      default:
        break;
    }
    
    setFilteredCourses(sorted);
  };

  const handleFilterApply = (filters) => {
    let filtered = [...courses];
    
    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(course => 
        filters.categories.includes(course.category.toLowerCase())
      );
    }
    
    // Filter by levels
    if (filters.levels && filters.levels.length > 0) {
      filtered = filtered.filter(course => 
        filters.levels.includes(course.level.toLowerCase())
      );
    }
    
    // Filter by price
    if (filters.price) {
      if (filters.price === 'free') {
        filtered = filtered.filter(course => course.price === 0);
      } else if (filters.price === 'paid') {
        filtered = filtered.filter(course => course.price > 0);
      }
    }
    
    // Filter by rating
    if (filters.rating) {
      const ratingValue = parseInt(filters.rating);
      filtered = filtered.filter(course => course.rating >= ratingValue);
    }
    
    // Filter by duration
    if (filters.duration) {
      const getDurationInMinutes = (durationStr) => {
        const [hours, minutes] = durationStr.replace(/[^0-9h m]/g, '').split('h');
        return parseInt(hours) * 60 + parseInt(minutes.replace('m', ''));
      };
      
      filtered = filtered.filter(course => {
        const durationMinutes = getDurationInMinutes(course.duration);
        
        if (filters.duration === 'short') {
          return durationMinutes < 180; // Less than 3 hours
        } else if (filters.duration === 'medium') {
          return durationMinutes >= 180 && durationMinutes <= 600; // 3-10 hours
        } else if (filters.duration === 'long') {
          return durationMinutes > 600; // More than 10 hours
        }
        
        return true;
      });
    }
    
    setFilteredCourses(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-indigo-700 rounded-xl p-8 mb-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white mb-4">Explore Courses</h1>
            <p className="text-indigo-100 mb-6">
              Discover a wide range of courses designed to help you excel in your studies. 
              From mathematics to science, programming to literature, find the perfect course for your learning journey.
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full bg-white pl-10 pr-3 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                placeholder="Search for courses, subjects, or keywords..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filters - would be hidden on mobile and shown with a modal */}
          <div className="hidden md:block md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              <CourseFilter onApplyFilters={handleFilterApply} />
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filters and sorting */}
            <div className="mb-6 flex space-x-4 md:justify-end">
              <div className="md:hidden">
                <button className="btn btn-secondary flex items-center">
                  <FaFilter className="mr-2" />
                  Filters
                </button>
              </div>
              
              <div className="relative">
                <button className="btn btn-secondary flex items-center">
                  <FaSortAmountDown className="mr-2" />
                  Sort by: {sortOption === 'popular' ? 'Most Popular' : 
                             sortOption === 'highestRated' ? 'Highest Rated' :
                             sortOption === 'newest' ? 'Newest' :
                             sortOption === 'priceLowToHigh' ? 'Price: Low to High' :
                             'Price: High to Low'}
                </button>
                
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 hidden">
                  <div className="py-1">
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleSort('popular')}
                    >
                      Most Popular
                    </button>
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleSort('highestRated')}
                    >
                      Highest Rated
                    </button>
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleSort('newest')}
                    >
                      Newest
                    </button>
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleSort('priceLowToHigh')}
                    >
                      Price: Low to High
                    </button>
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleSort('priceHighToLow')}
                    >
                      Price: High to Low
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredCourses.length}</span> courses
              </p>
            </div>
            
            {/* Courses grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg shadow-sm h-96 animate-pulse"
                  >
                    <div className="h-40 bg-gray-300 rounded-t-lg"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4 w-2/3"></div>
                      <div className="h-10 bg-gray-300 rounded mt-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              filteredCourses.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </motion.div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <svg 
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilteredCourses(courses);
                      }}
                      className="btn btn-primary"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              )
            )}
            
            {/* Pagination */}
            {filteredCourses.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center">
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md disabled:opacity-50" disabled>
                    Previous
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600">
                    1
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <span className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    8
                  </button>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-r-md">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;