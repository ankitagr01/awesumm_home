import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';
import { Building2, User2, MapPin, Brain, Heart, UtensilsCrossed, Plane, Timer, Briefcase } from 'lucide-react';

const ProfileDetails = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const profileSections = [
    { label: 'Role', value: userDetails.role, icon: <Briefcase className="w-5 h-5" /> },
    { label: 'Bio', value: userDetails.profile_bio, icon: <User2 className="w-5 h-5" /> },
    { label: 'Location', value: userDetails.location, icon: <MapPin className="w-5 h-5" /> },
    { label: 'Skills', value: userDetails.skills, icon: <Brain className="w-5 h-5" /> },
    { label: 'Interests', value: userDetails.interests, icon: <Heart className="w-5 h-5" /> },
    { label: 'Favorite recipes', value: userDetails.favorite_recipes, icon: <UtensilsCrossed className="w-5 h-5" /> },
    { label: 'I can recommend...', value: userDetails.recommendations, icon: <Plane className="w-5 h-5" /> },
    { 
      label: 'How long I have been with SUMM AI', 
      value: `${userDetails.days_with_company} days`, 
      icon: <Timer className="w-5 h-5" /> 
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fc] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Profile Details */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-8 space-y-8">
              {/* Header Section */}
              <div className="flex items-start space-x-6">
                <img
                  src={`/user_photos/${userDetails.first_name}.png`}
                  alt={userDetails.first_name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h1 className="text-2xl font-medium text-gray-900">
                    {userDetails.first_name} {userDetails.last_name}
                  </h1>
                  <div className="flex items-center text-gray-600 mt-2">
                    <Building2 className="w-4 h-4 mr-2" />
                    At the office
                  </div>
                </div>
              </div>

              {/* Info Items */}
              <div className="space-y-6">
                {profileSections.map((section, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">{section.label}</div>
                      <div className="text-gray-900 mt-1">{section.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Days */}
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Office days</div>
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

              {/* Ask me about */}
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Ask me about</div>
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

          {/* Right Column - MBTI */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
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