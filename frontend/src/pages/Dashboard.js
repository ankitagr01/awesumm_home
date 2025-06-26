import React from 'react';
import { Bell, MapPin, Home, Plane, HeartPulse } from 'lucide-react';

const Dashboard = () => {
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
              Welcome Back, <span className="text-gray-900">Sophie</span> 
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
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="col-span-2 space-y-6">
            {/* At the office section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h2 className="text-lg font-medium text-gray-900">At the office</h2>
              </div>
              
              {/* Office Floor Plan */}
              <div className="relative bg-gray-50 border-2 border-gray-200 rounded-lg h-80 overflow-hidden">
                {/* Room Layout */}
                <div className="absolute inset-4">
                  {/* Top Room */}
                  <div className="absolute top-0 left-0 right-0 h-24 border-2 border-gray-300 bg-white rounded-lg"></div>
                  
                  {/* Bottom Room */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 border-2 border-gray-300 bg-white rounded-lg"></div>
                  
                  {/* User Avatars positioned around the office */}
                  <img src="/api/placeholder/32/32" alt="User" className="absolute top-2 left-8 w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                  <img src="/api/placeholder/32/32" alt="User" className="absolute top-2 left-20 w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                  <img src="/api/placeholder/32/32" alt="User" className="absolute top-8 right-8 w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                  <img src="/api/placeholder/32/32" alt="User" className="absolute top-8 right-20 w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                  <img src="/api/placeholder/32/32" alt="User" className="absolute bottom-8 left-8 w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                  <img src="/api/placeholder/32/32" alt="User" className="absolute bottom-2 left-20 w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                  <img src="/api/placeholder/32/32" alt="User" className="absolute bottom-2 right-8 w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                  <img src="/api/placeholder/32/32" alt="User" className="absolute bottom-8 right-20 w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                </div>
              </div>
            </div>

            {/* Status indicators */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-700">On the road</span>
                    <img src="/api/placeholder/24/24" alt="User" className="w-6 h-6 rounded-full ml-auto" />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700">Home Office</span>
                    <div className="flex -space-x-1 ml-auto">
                      <img src="/api/placeholder/24/24" alt="User" className="w-6 h-6 rounded-full border-2 border-white" />
                      <img src="/api/placeholder/24/24" alt="User" className="w-6 h-6 rounded-full border-2 border-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Plane className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-700">Vacation</span>
                    <img src="/api/placeholder/24/24" alt="User" className="w-6 h-6 rounded-full ml-auto" />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <HeartPulse className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-700">Sick</span>
                    <img src="/api/placeholder/24/24" alt="User" className="w-6 h-6 rounded-full ml-auto" />
                  </div>
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

        {/* Co-workers Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Co-workers</h2>
          
          <div className="flex gap-6 overflow-x-auto pb-2">
            {[
              { name: 'Gabriel', status: 'online' },
              { name: 'Sophie', status: 'online' },
              { name: 'Ankit', status: 'online' },
              { name: 'Maria', status: 'online' },
              { name: 'Magda', status: 'away' },
              { name: 'Vanessa', status: 'offline' },
              { name: 'Flora', status: 'online' }
            ].map((coworker, index) => (
              <div key={coworker.name} className="flex flex-col items-center min-w-0">
                <div className="relative">
                  <img
                    src="/api/placeholder/48/48"
                    alt={coworker.name}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    coworker.status === 'online' ? 'bg-green-500' : 
                    coworker.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <span className="text-xs text-gray-700 mt-2 text-center">{coworker.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 