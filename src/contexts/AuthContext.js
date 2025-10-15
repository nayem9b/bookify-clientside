import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('bookify-token') || null);

  // Fetch user data when token changes
  const { data: userData, isLoading } = useQuery(['user', token], async () => {
    if (!token) return null;
    const response = await fetch('http://localhost:5000/api/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      localStorage.removeItem('bookify-token');
      setToken(null);
      return null;
    }
    return response.json();
  }, {
    enabled: !!token,
    onError: () => {
      localStorage.removeItem('bookify-token');
      setToken(null);
    },
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else if (userData === null) {
      setUser(null);
    }
    setLoading(isLoading);
  }, [userData, isLoading]);

  const login = (userData, authToken) => {
    localStorage.setItem('bookify-token', authToken);
    setToken(authToken);
    setUser(userData);
    toast.success('Logged in successfully!');
  };

  const logout = () => {
    localStorage.removeItem('bookify-token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully!');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
