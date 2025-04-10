import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/auth/Login';
import LoginButton from './components/auth/LoginButton';
import AdminDashboard from './components/admin/AdminDashboard';
import './App.css';

axios.defaults.withCredentials = true;

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const adminResponse = await axios.get('http://localhost:5000/api/admin/me');
      if (adminResponse.data.username) {
        setIsAdmin(true);
        setUser({ username: adminResponse.data.username });
      }
    } catch (adminError) {
      try {
        const userResponse = await axios.get('http://localhost:5000/api/users/me');
        if (userResponse.data) {
          setUser(userResponse.data);
          setIsAdmin(false);
        }
      } catch (error) {
        setUser(null);
        setIsAdmin(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      if (isAdmin) {
        await axios.get('http://localhost:5000/api/admin/logout');
        setIsAdmin(false);
        setUser(null);
        navigate('/');
      } else {
        await axios.get('http://localhost:5000/api/users/logout');
        setUser(null);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Protect dashboard route
  if (location.pathname.startsWith('/dashboard') && !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      {!location.pathname.includes('/dashboard') && (
        <LoginButton 
          user={user} 
          onLogout={handleLogout} 
          isLoginPage={location.pathname === '/login'} 
          isAdmin={isAdmin} 
        />
      )}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} setIsAdmin={setIsAdmin} />} />
        <Route 
          path="/dashboard/*" 
          element={
            isAdmin ? (
              <AdminDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;