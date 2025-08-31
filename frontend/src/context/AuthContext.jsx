import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 3. State to hold user information
  const [userInfo, setUserInfo] = useState(null);

  // 4. Check localStorage for user info when the app loads
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // 5. Login function
  const login = (userData) => {
    setUserInfo(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  // 6. Logout function
  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  // 7. The value provided to consuming components
  const value = {
    userInfo,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 8. Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};