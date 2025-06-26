import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        width: '100%',
        maxWidth: '450px'
      }}>
        {isLogin ? (
          <Login switchToSignup={switchToSignup} />
        ) : (
          <Signup switchToLogin={switchToLogin} />
        )}
      </div>
    </div>
  );
};

export default AuthPage; 