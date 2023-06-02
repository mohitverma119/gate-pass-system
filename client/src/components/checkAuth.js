import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function withAuthCheck(Component) {
  return function AuthenticatedComponent(props) {
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem('user_token');
      if (!token) {
        navigate('/');
      } else {
        try {
          const { exp } = jwt_decode(token);
          if (Date.now() >= exp * 1000) {
            localStorage.removeItem('user_token');
            localStorage.removeItem('user_id');
            navigate('/');
          }
        } catch {
          localStorage.removeItem('user_token');
          localStorage.removeItem('user_id');
          navigate('/');
        }
      }
    }, []);
    
    return <Component {...props} />;
  }
}
