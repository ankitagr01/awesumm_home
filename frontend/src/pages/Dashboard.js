import React, { useState, useEffect } from 'react';
import { Bell, MapPin, Home, Plane, HeartPulse, LogOut, User, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';
import { useNavigate, Link } from 'react-router-dom';

// Common styles for user icons
const USER_ICON_STYLES = {
  small: "w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover",
  medium: "w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover",
  large: "w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Function to handle clicking on a user's photo
  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await apiService.getEmployees();
        setEmployees(response.data.employees);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const getLocationBasedEmployees = (location) => {
    return employees.filter(emp => emp.today_location === location);
  };

  const atOfficeEmployees = getLocationBasedEmployees('MUC Office');
  const onRoadEmployees = getLocationBasedEmployees('Business Trip');
  const homeOfficeEmployees = getLocationBasedEmployees('Home Office');
  const vacationEmployees = getLocationBasedEmployees('Vacation');
  const sickEmployees = getLocationBasedEmployees('Sick');

  // Update the user photo rendering to be clickable
  const renderUserPhotos = (users, size = 'small') => {
    return users.slice(0, 3).map((employee, index) => (
      <img
        key={employee.id}
        src={employee.photo_url || '/default-avatar.png'}
        alt={`${employee.forename} ${employee.lastname}`}
        className={`${USER_ICON_STYLES[size]} cursor-pointer hover:opacity-80 transition-opacity`}
        style={{ marginLeft: index > 0 ? '-0.75rem' : '0' }}
        onClick={() => handleUserClick(employee.id)}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-[#f5f7fc] font-inter">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <img
              src="/co_loop_logo.png"
              alt="Co Loop Logo"
              className="h-10 w-auto cursor-pointer"
            />
          </Link>
          <div>
            <h1 className="text-xl font-medium flex items-center">
              Welcome back, {user?.first_name}
              <span className="ml-2">👋</span>
            </h1>
            <p className="text-sm text-gray-500">Friday 27, June 2025</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" />
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          <User 
            className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" 
            onClick={() => navigate(`/profile/${user.id}`)}
          />
          <LogOut 
            className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" 
            onClick={handleLogout}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left & Middle Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* At the office section */}
              <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h2 className="text-lg font-medium text-gray-900">At the office</h2>
                </div>
                
                {/* Office Floor Plan */}
                <div className="relative w-full h-[400px] border-[3px] border-black rounded-lg overflow-hidden bg-white">
                  {/* Desks with circular indicators */}
                  {/* Top room desks */}
                  <div className="absolute top-[30px] left-[30px] w-[80px] h-[90px] bg-gray-100 rounded-md">
                  </div>
                  <div className="absolute top-[30px] right-[30px] w-[90px] h-[80px] bg-gray-100 rounded-md">
                  </div>
                  
                  {/* Bottom room desks */}
                  <div className="absolute top-[220px] left-[20px] w-[80px] h-[60px] bg-gray-100 rounded-md">
                  </div>
                  <div className="absolute top-[330px] left-[20px] w-[80px] h-[60px] bg-gray-100 rounded-md">
                  </div>
                  <div className="absolute top-[220px] left-[180px] w-[80px] h-[60px] bg-gray-100 rounded-md">
                  </div>
                  <div className="absolute top-[330px] left-[180px] w-[80px] h-[60px] bg-gray-100 rounded-md">
                  </div>

                  {/* Dotted line with circles */}
                  <div className="absolute top-[200px] left-[20px] right-[20px] flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <div className="flex-1 border-b-2 border-dotted border-blue-400"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <div className="flex-1 border-b-2 border-dotted border-blue-400"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  </div>
                  
                  {/* Employee Photos */}
                  {atOfficeEmployees.map((employee, index) => {
                    const positions = [
                      { top: '60px', left: '50px' },     // Top left desk
                      { top: '50px', right: '60px' },    // Top right desk
                      { top: '240px', left: '40px' },    // Bottom left desk 1
                      { top: '350px', left: '40px' },    // Bottom left desk 2
                      { top: '240px', left: '200px' },   // Bottom center desk 1
                      { top: '350px', left: '200px' },   // Bottom center desk 2
                    ];

                    const position = positions[index] || {
                      top: `${240 + (index % 2) * 110}px`,
                      left: `${40 + Math.floor(index / 2) * 160}px`
                    };

                    return (
                      <div
                        key={employee.id}
                        className="absolute z-10 transition-all duration-300 hover:scale-110"
                        style={position}
                        onClick={() => handleUserClick(employee.id)}
                      >
                        <img
                          src={`/user_photos/${employee.first_name}.png`}
                          alt={employee.first_name}
                          className={`${USER_ICON_STYLES.small} cursor-pointer`}
                          title={employee.first_name}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right side sections */}
              <div className="space-y-4">
                {/* On the road section */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      <h2 className="text-lg font-medium text-gray-900">On the road</h2>
                    </div>
                    <div className="flex -space-x-3">
                      {onRoadEmployees.map((employee) => (
                        <img
                          key={employee.id}
                          src={`/user_photos/${employee.first_name}.png`}
                          alt={employee.first_name}
                          className={`${USER_ICON_STYLES.medium} hover:z-10 cursor-pointer`}
                          title={employee.first_name}
                          onClick={() => handleUserClick(employee.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Home Office section */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Home className="w-5 h-5 text-blue-500" />
                      <h2 className="text-lg font-medium text-gray-900">Home Office</h2>
                    </div>
                    <div className="flex -space-x-3">
                      {homeOfficeEmployees.map((employee) => (
                        <img
                          key={employee.id}
                          src={`/user_photos/${employee.first_name}.png`}
                          alt={employee.first_name}
                          className={`${USER_ICON_STYLES.medium} hover:z-10 cursor-pointer`}
                          title={employee.first_name}
                          onClick={() => handleUserClick(employee.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vacation section */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Plane className="w-5 h-5 text-purple-500" />
                      <h2 className="text-lg font-medium text-gray-900">Vacation</h2>
                    </div>
                    <div className="flex -space-x-3">
                      {vacationEmployees.map((employee) => (
                        <img
                          key={employee.id}
                          src={`/user_photos/${employee.first_name}.png`}
                          alt={employee.first_name}
                          className={`${USER_ICON_STYLES.medium} hover:z-10 cursor-pointer`}
                          title={employee.first_name}
                          onClick={() => handleUserClick(employee.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sick section */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-red-500" />
                      <h2 className="text-lg font-medium text-gray-900">Sick</h2>
                    </div>
                    <div className="flex -space-x-3">
                      {sickEmployees.map((employee) => (
                        <img
                          key={employee.id}
                          src={`/user_photos/${employee.first_name}.png`}
                          alt={employee.first_name}
                          className={`${USER_ICON_STYLES.medium} hover:z-10 cursor-pointer`}
                          title={employee.first_name}
                          onClick={() => handleUserClick(employee.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Co-workers Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Co-workers</h2>
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
                <div className="flex gap-8 min-w-max px-2">
                  {employees.map((employee) => {
                    const statusMap = {
                      green: 'online',
                      yellow: 'away',
                      red: 'offline',
                    };
                    const status = statusMap[employee.workload_status] || 'offline';
                    const statusColor = status === 'online' ? 'bg-green-500' : 
                                      status === 'away' ? 'bg-yellow-500' : 'bg-red-500';

                    return (
                      <div 
                        key={employee.id} 
                        className="flex flex-col items-center gap-3 cursor-pointer"
                        onClick={() => handleUserClick(employee.id)}
                      >
                        <div className="relative">
                          <img
                            src={`/user_photos/${employee.first_name}.png`}
                            alt={employee.first_name}
                            className={USER_ICON_STYLES.large}
                          />
                          <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white ${statusColor}`}></div>
                        </div>
                        <span className="text-sm text-gray-600 whitespace-nowrap">{employee.first_name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Weekly Prios */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Prios</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">Swimlanes Vertical (Chris)</span>
                    <span className="text-sm text-gray-500">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-800 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">Magic Translation Tool (Alex)</span>
                    <span className="text-sm text-gray-500">50%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">AuraFlows Demos (Gabriel)</span>
                    <span className="text-sm text-gray-500">16/20</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Today, Meetings */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-2">SUMM Calendar</h2>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {['23', '24', '25', '26', '27'].map((day, index) => (
                  <div key={day} className={`flex flex-col items-center p-2 rounded-lg text-xs ${
                    index === 4 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <span className="font-medium">{day}</span>
                    <span>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][index]}</span>
                    {index === 4 && <div className="flex gap-1 mt-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>}
                  </div>
                ))}
              </div>

              {/* Meeting List */}
              <div className="space-y-3">
                <div className="text-xs text-gray-500 mb-2">08 am</div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 text-left">Auraflow Demo call</h4>
                      <p className="text-xs text-gray-600">Demo with Hamburg (Gabriel)...</p>
                    </div>
                    <span className="text-xs text-gray-500">09</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-2">10 am</div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 text-left">Workshop Script</h4>
                      <p className="text-xs text-gray-600">Working demo (Ankit)...</p>
                    </div>
                    <span className="text-xs text-gray-500">10</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-2">11 am</div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 text-left">Customer Success</h4>
                      <p className="text-xs text-gray-600">Sucess story (Tobias)...</p>
                    </div>
                    <span className="text-xs text-gray-500">...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;