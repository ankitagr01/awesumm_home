import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';
import { Building2, User2, MapPin, Brain, Heart, UtensilsCrossed, Plane, Timer, Briefcase, Bell, Home, Search, User, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ProfileDetails = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await apiService.getEmployees();
        const currentUserDetails = response.data.employees.find(
          emp => emp.email === user.email
        );
        setUserDetails(currentUserDetails);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fc] p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-[#f5f7fc] p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">User details not found</div>
      </div>
    );
  }

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
          <LogOut className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - User Details */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              {/* Header with photo and name */}
              <div className="flex items-start gap-6 mb-12">
                <img
                  src={`/user_photos/${userDetails.first_name}.png`}
                  alt={userDetails.first_name}
                  className="w-24 h-24 rounded-full border-2 border-white shadow-sm object-cover"
                />
                <div>
                  <h1 className="text-2xl font-medium text-gray-900">
                    {userDetails.first_name} {userDetails.last_name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">At the office</span>
                  </div>
                </div>
              </div>

              {/* Profile sections */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Briefcase className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 text-left">Role</div>
                    <div className="text-gray-900 text-lg text-left">{userDetails.role}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <User2 className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 text-left">Bio</div>
                    <div className="text-gray-900 text-lg text-left">{userDetails.profile_bio}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 text-left">Location</div>
                    <div className="text-gray-900 text-lg text-left">{userDetails.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 text-left">Skills</div>
                    <div className="text-gray-900 text-lg text-left">{userDetails.skills}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 text-left">Interests</div>
                    <div className="text-gray-900 text-lg text-left">{userDetails.interests}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <UtensilsCrossed className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 text-left">Favorite recipes</div>
                    <div className="text-gray-900 text-lg text-left">{userDetails.favorite_recipes}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Plane className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 text-left">I can recommend...</div>
                    <div className="text-gray-900 text-lg text-left">{userDetails.recommendations}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Timer className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 text-left">How long I have been with SUMM AI</div>
                    <div className="text-gray-900 text-lg text-left">{userDetails.days_with_company} days</div>
                  </div>
                </div>

                {/* Office days for this week */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Building2 className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 text-left">Office days for this week</div>
                    <div className="flex flex-wrap gap-2">
                      {userDetails.office_days.map((day, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ask me about */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1 text-left">Ask me about</div>
                    <div className="flex flex-wrap gap-2">
                      {['Translation', 'Training for Marathon', 'Erasmus'].map((topic, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                        >
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - MBTI */}
            <div className="space-y-6">
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
    </div>
  );
};

export default ProfileDetails; 