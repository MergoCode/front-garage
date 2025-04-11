// GoogleCallback.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function GoogleCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to handle the callback
    const handleCallback = async () => {
      try {
        // Get the code parameter from the URL
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        
        if (!code) {
          // If there's an error parameter, display it
          const error = searchParams.get('error');
          if (error) {
            setError(`Authentication error: ${error}`);
          } else {
            setError('No authorization code found');
          }
          setLoading(false);
          return;
        }

        // The backend will process the code and redirect with tokens
        // This component will not see that request as it will be a full redirect
        
        // Alternatively, if your backend returns JSON instead of redirecting:
        // const response = await axios.get(`http://localhost:8000/api/auth/google/callback/?code=${code}`);
        // const { access_token, refresh_token } = response.data;
        // localStorage.setItem('access_token', access_token);
        // localStorage.setItem('refresh_token', refresh_token);
        // navigate('/dashboard');
      } catch (err) {
        console.error('Error during Google callback processing:', err);
        setError('Failed to complete authentication');
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [location, navigate]);

  // Get tokens from URL if they're there (for the case where backend redirects with tokens)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (accessToken && refreshToken) {
      // Store tokens
      sessionStorage.setItem('access_token', accessToken);
      sessionStorage.setItem('refresh_token', refreshToken);
      
      // Redirect to dashboard or home page
      navigate('/home');
    }
  }, [location, navigate]);

  if (loading) {
    return <div className="google-callback">Processing authentication... Please wait.</div>;
  }

  if (error) {
    return <div className="google-callback error">{error}</div>;
  }

  return <div className="google-callback">Authentication successful! Redirecting...</div>;
}

export default GoogleCallback;