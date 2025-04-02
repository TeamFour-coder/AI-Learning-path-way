import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar,
  PieChart, Pie, Cell
} from 'recharts';
import { FaBook, FaRegCalendarAlt, FaRegClock, FaChevronRight, FaLaptop, FaFileAlt } from 'react-icons/fa';


const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Mock data
  const progressData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 75 },
    { month: 'Apr', score: 72 },
    { month: 'May', score: 80 },
    { month: 'Jun', score: 85 },
  ];
  
  const skillsData = [
    { subject: 'Mathematics', A: 85, fullMark: 100 },
    { subject: 'Physics', A: 70, fullMark: 100 },
    { subject: 'Chemistry', A: 65, fullMark: 100 },
    { subject: 'Biology', A: 78, fullMark: 100 },
    { subject: 'English', A: 90, fullMark: 100 },
    { subject: 'Computer Science', A: 95, fullMark: 100 },
  ];
  
  const courseProgress = [
    { name: 'Advanced Mathematics', progress: 75 },
    { name: 'Physics Fundamentals', progress: 60 },
    { name: 'Chemistry Labs', progress: 45 },
    { name: 'Programming Basics', progress: 90 },
  ];
  
  const upcomingAssessments = [
    { id: 1, title: 'Mathematics Mid-term', date: '15 Mar 2025', time: '10:00 AM' },
    { id: 2, title: 'Physics Lab Evaluation', date: '22 Mar 2025', time: '2:30 PM' },
    { id: 3, title: 'Programming Assignment', date: '28 Mar 2025', time: '11:59 PM' },
  ];
  
  const pieData = [
    { name: 'Completed', value: 25 },
    { name: 'In Progress', value: 15 },
    { name: 'Not Started', value: 10 },
  ];
  
  const COLORS = ['#10B981', '#6366F1', '#9CA3AF'];
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 600);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Sidebar */}
          <motion.div 
            className="w-full md:w-64 bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">JS</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">John Smith</h3>
                <p className="text-sm text-gray-500">Grade 11 Student</p>
              </div>
            </div>
            
            <nav>
              <ul className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: <FaLaptop className="mr-2" /> },
                  { id: 'courses', label: 'My Courses', icon: <FaBook className="mr-2" /> },
                  { id: 'assessments', label: 'Assessments', icon: <FaFileAlt className="mr-2" /> },
                  { id: 'recommendations', label: 'Recommendations', icon: <FaChevronRight className="mr-2" /> },
                  { id: 'settings', label: 'Settings', icon: <FaChevronRight className="mr-2" /> },
                ].map(tab => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                        activeTab === tab.id 
                          ? 'bg-indigo-100 text-indigo-700 font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {/* Header */}
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm mb-6"
              variants={itemVariants}
            >
              <h1 className="text-2xl font-bold text-gray-800">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'courses' && 'My Courses'}
                {activeTab === 'assessments' && 'Assessments'}
                {activeTab === 'recommendations' && 'Recommended Resources'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-gray-600">
                {activeTab === 'overview' && 'Track your progress and view personalized recommendations'}
                {activeTab === 'courses' && 'Manage your enrolled courses and track completion'}
                {activeTab === 'assessments' && 'View upcoming and completed assessments'}
                {activeTab === 'recommendations' && 'Resources selected based on your learning needs'}
                {activeTab === 'settings' && 'Update your personal information and preferences'}
              </p>
            </motion.div>
            
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Stats */}
                <motion.div 
                  className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                  variants={itemVariants}
                >
                  {[
                    { label: 'Courses Enrolled', value: '8', color: 'bg-blue-500' },
                    { label: 'Completed', value: '3', color: 'bg-green-500' },
                    { label: 'Assessments Taken', value: '12', color: 'bg-purple-500' },
                    { label: 'Avg. Score', value: '78%', color: 'bg-yellow-500' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4">
                      <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white`}>
                        {stat.value}
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <p className="font-semibold">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
                
                {/* Progress Chart */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm"
                  variants={itemVariants}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h2>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={progressData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#6366F1" 
                          strokeWidth={2}
                          dot={{ r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
                
                {/* Skills Radar */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm"
                  variants={itemVariants}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Skills Assessment</h2>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={skillsData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Skills"
                          dataKey="A"
                          stroke="#EC4899"
                          fill="#EC4899"
                          fillOpacity={0.5}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
                
                {/* Course Progress */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm"
                  variants={itemVariants}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Course Completion</h2>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={courseProgress}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" width={150} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="progress" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
                
                {/* Course Stats */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm"
                  variants={itemVariants}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Course Statistics</h2>
                  <div className="h-72 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
                
                {/* Upcoming Assessments */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2"
                  variants={itemVariants}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Assessments</h2>
                  <div className="space-y-4">
                    {upcomingAssessments.map(assessment => (
                      <div 
                        key={assessment.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-800">{assessment.title}</h3>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <FaRegCalendarAlt className="mr-2" />
                              <span>{assessment.date}</span>
                              <span className="mx-2">•</span>
                              <FaRegClock className="mr-2" />
                              <span>{assessment.time}</span>
                            </div>
                          </div>
                          <button className="text-indigo-600 hover:text-indigo-800">
                            <FaChevronRight />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
            
            {/* Placeholder for other tabs */}
            {activeTab !== 'overview' && (
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-700 text-center py-8">
                  {activeTab === 'courses' && 'Courses content will be displayed here.'}
                  {activeTab === 'assessments' && 'Assessments content will be displayed here.'}
                  {activeTab === 'recommendations' && 'Recommendations content will be displayed here.'}
                  {activeTab === 'settings' && 'Settings content will be displayed here.'}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;