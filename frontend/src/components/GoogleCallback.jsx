import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function GoogleCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    console.log("URL Params:", { accessToken, refreshToken }); // Debug

    if (accessToken && refreshToken) {
      console.log("Storing tokens:", { accessToken, refreshToken }); // Debug
      sessionStorage.setItem('accessToken', accessToken.trim()); // Trim to avoid whitespace
      sessionStorage.setItem('refreshToken', refreshToken.trim());
      navigate('/home');
      setLoading(false);
    } else {
      setError('No tokens found in URL');
      setLoading(false);
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