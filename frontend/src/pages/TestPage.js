import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const TestPage = () => {
  const [apiData, setApiData] = useState({
    hello: null,
    status: null,
    users: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Testing API endpoints...');

      // Test all endpoints
      const [helloResponse, statusResponse, usersResponse] = await Promise.all([
        apiService.testHello(),
        apiService.getStatus(),
        apiService.getTestUsers(),
      ]);

      setApiData({
        hello: helloResponse.data,
        status: statusResponse.data,
        users: usersResponse.data,
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

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Testing API Connection...</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <h2>API Test Failed</h2>
        <p>{error}</p>
        <button onClick={testAPI} style={{ marginTop: '10px', padding: '10px 20px' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎉 API Connection Test - SUCCESS!</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Django Backend ↔ React Frontend Communication Working!</h2>
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          ✅ All API endpoints responding correctly
        </p>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {/* Hello Endpoint */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>🔗 /api/hello/</h3>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '3px' }}>
            {JSON.stringify(apiData.hello, null, 2)}
          </pre>
        </div>

        {/* Status Endpoint */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>📊 /api/status/</h3>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '3px' }}>
            {JSON.stringify(apiData.status, null, 2)}
          </pre>
        </div>

        {/* Users Endpoint */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>👥 /api/test-users/</h3>
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
        <h3>🚀 Next Steps:</h3>
        <ul>
          <li>✅ Django backend running on http://localhost:8000</li>
          <li>✅ React frontend running on http://localhost:3000</li>
          <li>✅ CORS configured and working</li>
          <li>✅ API endpoints responding</li>
          <li>🔄 Ready to build real features!</li>
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
        🔄 Test API Again
      </button>
    </div>
  );
};

export default TestPage; 