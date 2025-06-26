import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';
import { MapPin, Brain, Calendar, Clock, Smile, Coffee, Plane } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-[#f5f7fc] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - User Details */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-6">
              <img
                src={`/user_photos/${userDetails.first_name}.png`}
                alt={userDetails.first_name}
                className="w-24 h-24 rounded-full border-2 border-white shadow-sm object-cover"
              />
              <div>
                <h1 className="text-2xl font-medium text-gray-900">
                  {userDetails.first_name} {userDetails.last_name}
                </h1>
                <p className="text-gray-600">{userDetails.role}</p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{userDetails.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Bio</h2>
                <p className="text-gray-600">{userDetails.profile_bio}</p>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Office days</h2>
                <div className="flex gap-2">
                  {userDetails.office_days.map((day, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {userDetails.skills.split(',').map((skill, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {skill.trim()}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {userDetails.interests.split(',').map((interest, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                    >
                      {interest.trim()}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Favorite recipes</h2>
                <p className="text-gray-600">{userDetails.favorite_recipes}</p>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">I can recommend...</h2>
                <p className="text-gray-600">{userDetails.recommendations}</p>
              </div>
            </div>
          </div>

          {/* Right Column - MBTI and Stats */}
          <div className="space-y-6">
            {/* MBTI Section */}
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