// GoogleLogin.jsx
import { useState } from 'react';
import axios from 'axios';

function GoogleLogin() {
  const [loading, setLoading] = useState(false);
  
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Get the authentication URL from your backend
      const response = await axios.get('http://localhost:8000/api/auth/google/');
      
      // Redirect the browser to Google's authorization page
      window.location.href = response.data.auth_url;
    } catch (error) {
      console.error('Error initiating Google login:', error);
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-block"
      onClick={handleGoogleLogin}
      disabled={loading}
    >
      <i className="fab fa-google"></i>
      {loading ? 'Redirecting...' : 'Sign In with Google'}
    </button>
  );
}

export default GoogleLogin;