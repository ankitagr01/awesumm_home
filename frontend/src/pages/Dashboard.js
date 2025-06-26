import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [apiData, setApiData] = useState({
    hello: null,
    status: null,
    users: null,
    supabase: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Testing API endpoints...');

      // Test all endpoints
      const [helloResponse, statusResponse, usersResponse, supabaseResponse] = await Promise.all([
        apiService.testHello(),
        apiService.getStatus(),
        apiService.getTestUsers(),
        apiService.testSupabase(),
      ]);

      setApiData({
        hello: helloResponse.data,
        status: statusResponse.data,
        users: usersResponse.data,
        supabase: supabaseResponse.data,
      });

      console.log('All API tests successful!');
    } catch (err) {
      console.error('API test failed:', err);
      setError(`API Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testAPI();
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
          <button onClick={testAPI} style={{ marginTop: '10px', padding: '10px 20px' }}>
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
            {/* Hello Endpoint */}
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
              <h3>🔗 API Test</h3>
              <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '3px' }}>
                {JSON.stringify(apiData.hello, null, 2)}
              </pre>
            </div>

            {/* Status Endpoint */}
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
              <h3>📊 Backend Status</h3>
              <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '3px' }}>
                {JSON.stringify(apiData.status, null, 2)}
              </pre>
            </div>

            {/* Supabase Test */}
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
              <h3>🗃️ Supabase Connection</h3>
              <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '3px' }}>
                {JSON.stringify(apiData.supabase, null, 2)}
              </pre>
            </div>

            {/* Users Endpoint */}
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
              <h3>👥 Mock Users Data</h3>
              <p>Found {apiData.users?.count} test users:</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {apiData.users?.users?.map(user => (
                  <div 
                    key={user.id} 
                    style={{ 
                      border: '1px solid #ccc', 
                      padding: '10px', 
                      borderRadius: '5px',
                      backgroundColor: user.status === 'available' ? '#e8f5e8' : 
                                      user.status === 'busy' ? '#ffe8e8' : '#fff3e0'
                    }}
                  >
                    <strong>{user.name}</strong><br/>
                    <small>{user.role} • {user.status}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '5px' }}>
            <h3>🎯 Next Development Steps:</h3>
            <ul>
              <li>✅ User Authentication (Login/Signup) - <strong>COMPLETE!</strong></li>
              <li>✅ Supabase Integration - <strong>WORKING!</strong></li>
              <li>✅ User Profile Management - <strong>BASIC VERSION DONE!</strong></li>
              <li>🔄 Dashboard with real user status</li>
              <li>⏳ Profile editing capabilities</li>
              <li>⏳ User status management</li>
              <li>⏳ Advanced dashboard features</li>
            </ul>
          </div>

          <button 
            onClick={testAPI}
            style={{
              marginTop: '20px',
              padding: '15px 30px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            🔄 Refresh API Status
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 