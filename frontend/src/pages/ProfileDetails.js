import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';
import { Building2, User2, MapPin, Brain, Heart, UtensilsCrossed, Plane, Timer, Briefcase, Bell, Home, Search, User, LogOut, Pencil, MessageCircle } from 'lucide-react';
import { useNavigate, Link, useParams } from 'react-router-dom';

const ProfileDetails = () => {
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        let response;
        
        if (!userId || userId === user.id) {
          const employeesResponse = await apiService.getEmployees();
          response = employeesResponse.data.employees.find(emp => emp.id === user.id);
          if (!response) {
            throw new Error('Current user details not found');
          }
        } else {
          try {
            const detailsResponse = await apiService.getUserDetails(userId);
            response = detailsResponse.data;
          } catch (detailsError) {
            console.error('Failed to fetch user details, trying employees endpoint:', detailsError);
            const employeesResponse = await apiService.getEmployees();
            response = employeesResponse.data.employees.find(emp => emp.id === userId);
            if (!response) {
              throw new Error('User not found in any data source');
            }
          }
        }
        
        if (response) {
          // Ensure all required fields have default values
          const sanitizedResponse = {
            ...response,
            first_name: response.first_name || 'Unknown',
            last_name: response.last_name || 'User',
            role: response.role || 'No role specified',
            location: response.location || 'Location not set',
            profile_bio: response.profile_bio || 'No bio available',
            office_days: Array.isArray(response.office_days) ? response.office_days : [],
            workload_status: response.workload_status || 'unknown',
            today_location: response.today_location || 'Not specified',
            skills: response.skills || 'No skills listed',
            interests: response.interests || 'No interests listed',
            favorite_recipes: response.favorite_recipes || 'No recipes listed',
            recommendations: response.recommendations || 'No recommendations yet',
            days_with_company: response.days_with_company || 0,
          };
          setUserDetails(sanitizedResponse);
        } else {
          throw new Error('User details not found');
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, user.id]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Show loading state
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">Error: {error}</div>
          <button 
            onClick={() => navigate('/')} 
            className="text-blue-500 hover:text-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Show error state if no user details
  if (!userDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">User not found</div>
          <button 
            onClick={() => navigate('/')} 
            className="text-blue-500 hover:text-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isCurrentUser = !userId || userId === user.id;

  // Hardcoded status display function
  const getStatusDisplay = () => {
    if (isCurrentUser) {
      return {
        color: 'bg-green-500',
        text: 'Online'
      };
    }
    // Hardcoded statuses for different users
    const statusMap = {
      'Flora': { color: 'bg-yellow-500', text: 'Away' },
      'Christian': { color: 'bg-red-500', text: 'Busy' },
      'Gabriel': { color: 'bg-green-500', text: 'Online' },
      'Magda': { color: 'bg-gray-400', text: 'Offline' }
    };
    return statusMap[userDetails?.first_name] || { color: 'bg-gray-400', text: 'Offline' };
  };

  return (
    <div className="min-h-screen bg-[#f5f7fc]">
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
            onClick={() => navigate('/profile')}
          />
          <LogOut 
            className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" 
            onClick={handleLogout}
          />
        </div>
      </div>

      <div className="w-full py-8 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - User Details */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg p-6 shadow-sm relative">
              {/* Only show edit icon for current user's profile */}
              {isCurrentUser && (
                <div className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <Pencil className="w-5 h-5" />
                </div>
              )}

              {/* Header with photo and name */}
              <div className="flex items-start gap-4 mb-8">
                <div className="relative">
                  <img
                    src={userDetails.profile_picture || `/user_photos/${userDetails.first_name}.png`}
                    alt={`${userDetails.first_name} ${userDetails.last_name}`}
                    className="w-20 h-20 rounded-full border-2 border-white shadow-sm object-cover"
                    onError={(e) => {
                      e.target.src = '/default-avatar.png';
                    }}
                  />
                  <div className={`absolute top-0 right-0 w-4 h-4 rounded-full ${getStatusDisplay().color} border-2 border-white`}></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-medium text-gray-900">
                      {userDetails.first_name} {userDetails.last_name}
                    </h1>
                    {!isCurrentUser && (
                      <MessageCircle 
                        className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-600 transition-colors" 
                        onClick={() => navigate('/')}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{userDetails.today_location || 'Location unknown'}</span>
                  </div>
                </div>
              </div>

              {/* Profile sections */}
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5 text-left">Role</div>
                    <div className="text-gray-900 text-base text-left">{userDetails.role}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <User2 className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5 text-left">Bio</div>
                    <div className="text-gray-900 text-base text-left">{userDetails.profile_bio}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5 text-left">Location</div>
                    <div className="text-gray-900 text-base text-left">{userDetails.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5 text-left">Skills</div>
                    <div className="text-gray-900 text-base text-left">{userDetails.skills}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5 text-left">Interests</div>
                    <div className="text-gray-900 text-base text-left">{userDetails.interests}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <UtensilsCrossed className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5 text-left">Favorite recipes</div>
                    <div className="text-gray-900 text-base text-left">{userDetails.favorite_recipes}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Plane className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5 text-left">I can recommend...</div>
                    <div className="text-gray-900 text-base text-left">{userDetails.recommendations}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Timer className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5 text-left">How long I have been with SUMM AI</div>
                    <div className="text-gray-900 text-base text-left">{userDetails.days_with_company} days</div>
                  </div>
                </div>

                {/* Vacation Days Left */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Plane className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5 text-left">Vacation days left</div>
                    <div className="text-gray-900 text-base text-left">
                      <span>9/25</span>
                      <span className="text-xs text-gray-500 ml-1">days</span>
                    </div>
                  </div>
                </div>

                {/* Office days for this week */}
                {Array.isArray(userDetails.office_days) && userDetails.office_days.length > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Building2 className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5 text-left">Office days for this week</div>
                      <div className="flex flex-wrap gap-1.5">
                        {userDetails.office_days.map((day, index) => (
                          <div
                            key={index}
                            className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg text-sm"
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Ask me about */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5 text-left">Ask me about</div>
                    <div className="flex flex-wrap gap-1.5">
                      {(userDetails.interests ? 
                        userDetails.interests.split(',').slice(0, 3) : 
                        ['My Role', 'My Experience', 'My Skills']
                      ).map((topic, index) => (
                        <div
                          key={index}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm"
                        >
                          {topic.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - MBTI */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <img 
                src="/profile_right.png" 
                alt="MBTI Profile" 
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails; 