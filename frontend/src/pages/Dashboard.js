import React, { useState, useEffect } from 'react';
import { Bell, MapPin, Home, Plane, HeartPulse } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';

// Common styles for user icons
const USER_ICON_STYLES = {
  small: "w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover",
  medium: "w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover",
  large: "w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
};

const Dashboard = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);

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

  return (
    <div className="min-h-screen bg-[#f5f7fc] font-inter">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white">
        <div className="flex items-center gap-4">
          <img
            src="/api/placeholder/40/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h1 className="text-xl font-medium text-gray-900">
              Welcome Back, <span className="text-gray-900">{user?.forename || 'Sophie'}</span> 
              <span className="ml-2">👋</span>
            </h1>
            <p className="text-sm text-gray-500">Wednesday 5, July 2025</p>
          </div>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-400 cursor-pointer" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
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
                <div className="relative w-full h-[600px] border-[5px] border-black rounded-lg overflow-hidden bg-white">
                  {/* Rooms */}
                  <div className="absolute top-0 left-0 w-full h-[300px] border-r-[5px] border-black"></div>
                  <div className="absolute top-[300px] left-0 w-full h-[300px] border-r-[5px] border-black"></div>
                  
                  {/* Inner Wall */}
                  <div className="absolute top-[250px] left-[400px] w-[5px] h-[50px] bg-black"></div>
                  
                  {/* Side Room */}
                  <div className="absolute top-[300px] right-[-5px] w-[60px] h-[300px] border-[5px] border-l-0 border-black"></div>

                  {/* Desks - Top Room */}
                  <div className="absolute top-[40px] left-[30px] w-[80px] h-[120px] bg-gray-200"></div>
                  <div className="absolute top-[40px] right-[30px] w-[120px] h-[80px] bg-gray-200"></div>

                  {/* Desks - Bottom Room */}
                  <div className="absolute top-[330px] left-[20px] w-[100px] h-[80px] bg-gray-200"></div>
                  <div className="absolute top-[420px] left-[20px] w-[100px] h-[80px] bg-gray-200"></div>
                  <div className="absolute top-[330px] left-[140px] w-[100px] h-[80px] bg-gray-200"></div>
                  <div className="absolute top-[420px] left-[140px] w-[100px] h-[80px] bg-gray-200"></div>
                  <div className="absolute top-[330px] left-[260px] w-[100px] h-[80px] bg-gray-200"></div>
                  <div className="absolute top-[420px] left-[260px] w-[100px] h-[80px] bg-gray-200"></div>
                  <div className="absolute top-[500px] left-[360px] w-[120px] h-[50px] bg-gray-200"></div>

                  {/* Employee Photos - Top Section */}
                  {atOfficeEmployees.slice(0, 2).map((employee, index) => {
                    const positions = [
                      { top: '70px', left: '40px' },  // Near top-left desk
                      { top: '60px', right: '50px' }  // Near top-right desk
                    ];
                    return (
                      <img 
                        key={employee.id}
                        src={`/user_photos/${employee.first_name}.png`}
                        alt={employee.first_name} 
                        className={`absolute ${USER_ICON_STYLES.small} z-10`}
                        style={positions[index]}
                        onError={(e) => { e.target.onerror = null; e.target.src="/api/placeholder/32/32" }}
                      />
                    );
                  })}

                  {/* Employee Photos - Bottom Section */}
                  {atOfficeEmployees.slice(2).map((employee, index) => {
                    const positions = [
                      { top: '350px', left: '40px' },    // Near bottom-left1 desk
                      { top: '440px', left: '40px' },    // Near bottom-left2 desk
                      { top: '350px', left: '160px' },   // Near bottom-center1 desk
                      { top: '440px', left: '160px' },   // Near bottom-center2 desk
                      { top: '350px', left: '280px' },   // Near bottom-right1 desk
                      { top: '440px', left: '280px' },   // Near bottom-right2 desk
                      { top: '510px', left: '380px' }    // Near bottom-far-right desk
                    ];
                    return (
                      <img 
                        key={employee.id}
                        src={`/user_photos/${employee.first_name}.png`}
                        alt={employee.first_name} 
                        className={`absolute ${USER_ICON_STYLES.small} z-10`}
                        style={positions[index] || { top: '350px', left: '40px' }}
                        onError={(e) => { e.target.onerror = null; e.target.src="/api/placeholder/32/32" }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Statuses Column */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-orange-400" />
                    <span className="font-medium text-gray-700">On the road</span>
                  </div>
                  <div className="flex -space-x-2 justify-end mt-2">
                    {onRoadEmployees.map(employee => (
                      <img 
                        key={employee.id} 
                        src={`/user_photos/${employee.first_name}.png`} 
                        alt={employee.first_name} 
                        className={USER_ICON_STYLES.small}
                        onError={(e) => { e.target.onerror = null; e.target.src="/api/placeholder/32/32" }} 
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-blue-400" />
                    <span className="font-medium text-gray-700">Home Office</span>
                  </div>
                  <div className="flex -space-x-2 justify-end mt-2">
                    {homeOfficeEmployees.map(employee => (
                      <img 
                        key={employee.id} 
                        src={`/user_photos/${employee.first_name}.png`} 
                        alt={employee.first_name} 
                        className={USER_ICON_STYLES.small}
                        onError={(e) => { e.target.onerror = null; e.target.src="/api/placeholder/32/32" }} 
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Plane className="w-5 h-5 text-purple-400" />
                    <span className="font-medium text-gray-700">Vacation</span>
                  </div>
                  <div className="flex -space-x-2 justify-end mt-2">
                    {vacationEmployees.map(employee => (
                      <img 
                        key={employee.id} 
                        src={`/user_photos/${employee.first_name}.png`} 
                        alt={employee.first_name} 
                        className={USER_ICON_STYLES.small}
                        onError={(e) => { e.target.onerror = null; e.target.src="/api/placeholder/32/32" }} 
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <HeartPulse className="w-5 h-5 text-red-400" />
                    <span className="font-medium text-gray-700">Sick</span>
                  </div>
                  <div className="flex -space-x-2 justify-end mt-2">
                    {sickEmployees.map(employee => (
                      <img 
                        key={employee.id} 
                        src={`/user_photos/${employee.first_name}.png`} 
                        alt={employee.first_name} 
                        className={USER_ICON_STYLES.small}
                        onError={(e) => { e.target.onerror = null; e.target.src="/api/placeholder/32/32" }} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Co-workers Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Co-workers</h2>
              <div className="flex gap-6 overflow-x-auto pb-2">
                {employees.map((employee) => {
                  const statusMap = {
                    green: 'online',
                    yellow: 'away',
                    red: 'offline',
                  };
                  const status = statusMap[employee.workload_status] || 'offline';

                  return (
                    <div key={employee.id} className="flex flex-col items-center min-w-0">
                      <div className="relative">
                        <img
                          src={`/user_photos/${employee.first_name}.png`}
                          alt={employee.first_name}
                          className={USER_ICON_STYLES.large}
                          onError={(e) => { e.target.onerror = null; e.target.src="/api/placeholder/48/48" }}
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          status === 'online' ? 'bg-green-500' : 
                          status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <span className="text-sm text-gray-700 mt-2 text-center">{employee.first_name}</span>
                    </div>
                  );
                })}
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
                    <span className="text-sm text-gray-700">Web Plugin</span>
                    <span className="text-sm text-gray-500">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-800 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">Translation Tool</span>
                    <span className="text-sm text-gray-500">50%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">AuraFlows Demos</span>
                    <span className="text-sm text-gray-500">872,400</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Today, Meetings */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Today, Meetings</h2>
              
              {/* Calendar Days */}
              <div className="flex gap-2 mb-4">
                {['03', '04', '05', '06', '07'].map((day, index) => (
                  <div key={day} className={`flex flex-col items-center p-2 rounded-lg text-xs ${
                    index === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <span className="font-medium">{day}</span>
                    <span>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][index]}</span>
                    {index === 2 && <div className="flex gap-1 mt-1">
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
                      <h4 className="text-sm font-medium text-gray-900">Digital Marketing</h4>
                      <p className="text-xs text-gray-600">Brainstorming for the upcoming...</p>
                    </div>
                    <span className="text-xs text-gray-500">09</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-2">10 am</div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">UI Development</h4>
                      <p className="text-xs text-gray-600">A review for collecting new inputs...</p>
                    </div>
                    <span className="text-xs text-gray-500">10</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-2">11 am</div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Data Analysis</h4>
                      <p className="text-xs text-gray-600">A review for collecting user feedback...</p>
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