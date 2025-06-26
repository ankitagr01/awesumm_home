import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [apiData, setApiData] = useState({
    status: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load basic API status
      const statusResponse = await apiService.getStatus();

      setApiData({
        status: statusResponse.data,
      });

    } catch (err) {
      setError(`API Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div>
          <h1>🎉 Employee Tracker Dashboard</h1>
          <p>Welcome back, <strong>{user?.forename || user?.email}</strong>!</p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Logout
        </button>
      </div>

      {/* User Info */}
      <div style={{ 
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#e7f3ff',
        borderRadius: '8px'
      }}>
        <h2>👤 Your Profile</h2>
        <div style={{ display: 'grid', gap: '10px' }}>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>First Name:</strong> {user?.forename || 'Not provided'}</p>
          <p><strong>Last Name:</strong> {user?.lastname || 'Not provided'}</p>
          <p><strong>User ID:</strong> {user?.id}</p>
          {user?.created_at && (
            <p><strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
          )}
        </div>
      </div>

      {/* API Status */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Loading API Status...</h2>
          <p>Testing backend connectivity...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red', padding: '40px' }}>
          <h2>API Connection Error</h2>
          <p>{error}</p>
          <button onClick={loadDashboardData} style={{ marginTop: '10px', padding: '10px 20px' }}>
            Retry Connection
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '30px' }}>
            <h2>🚀 System Status - All Services Online!</h2>
            <p style={{ color: 'green', fontWeight: 'bold' }}>
              ✅ Django Backend + Supabase + React Frontend working perfectly!
            </p>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#28a745' }}>✅ System Status</h3>
                <p style={{ margin: 0, fontSize: '14px' }}>{apiData.status?.status || 'Unknown'}</p>
              </div>
              
              <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>👤 User Profile</h3>
                <p style={{ margin: 0, fontSize: '14px' }}>Profile Active</p>
              </div>
              
              <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#6c757d' }}>📊 Dashboard</h3>
                <p style={{ margin: 0, fontSize: '14px' }}>Ready for Development</p>
              </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ marginTop: 0 }}>📈 Recent Activity</h3>
              <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
                No recent activity to display. This section will show employee tracking data once features are implemented.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
            <h3 style={{ color: '#1976d2', marginTop: 0 }}>🚀 Next Development Steps</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginTop: '15px' }}>
              <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ddd' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#28a745' }}>✅ Completed</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
                  <li>User Authentication</li>
                  <li>Supabase Integration</li>
                  <li>Basic Profile Management</li>
                  <li>Protected Routes</li>
                </ul>
              </div>
              <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ddd' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#ffc107' }}>⏳ In Progress</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
                  <li>Dashboard Enhancement</li>
                  <li>Code Cleanup</li>
                </ul>
              </div>
              <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ddd' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#6c757d' }}>📋 Planned</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
                  <li>Profile Editing</li>
                  <li>Time Tracking</li>
                  <li>Attendance Management</li>
                  <li>Reporting Features</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 