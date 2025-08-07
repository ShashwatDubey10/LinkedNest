import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { checkAuth } from "./api/auth";
import { Toaster } from "react-hot-toast";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const ProtectedRoute = ({ children }) => {
  const { user, authChecked } = useAuth();
  const location = useLocation();
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const GuestRoute = ({ children }) => {
  const { user, authChecked } = useAuth();
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route
      path="/login"
      element={
        <GuestRoute>
          <LoginPage />
        </GuestRoute>
      }
    />
    <Route
      path="/register"
      element={
        <GuestRoute>
          <RegisterPage />
        </GuestRoute>
      }
    />
    <Route
      path="/profile/:id"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const verifyUser = async () => {
    try {
      const data = await checkAuth();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authChecked, verifyUser }}>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <AppRoutes />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
