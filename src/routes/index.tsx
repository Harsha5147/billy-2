import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import UserDashboard from '../components/UserDashboard';
import QASection from '../components/QASection';
import DefenseTactics from '../components/DefenseTactics';
import ExperienceSharing from '../components/ExperienceSharing';
import AdminDashboard from '../components/AdminDashboard';
import Auth from '../components/Auth';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" replace />;
};

const AdminRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user } = useAuth();
  return user?.isAdmin ? element : <Navigate to="/" replace />;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const { reports } = useData();

  const userReports = user ? reports?.filter(report => report.userId === user.id) || [] : [];

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<UserDashboard userReports={userReports} />} />}
      />
      <Route
        path="/qa"
        element={<PrivateRoute element={<QASection />} />}
      />
      <Route path="/defense" element={<DefenseTactics />} />
      <Route
        path="/experiences"
        element={<PrivateRoute element={<ExperienceSharing />} />}
      />
      <Route
        path="/admin"
        element={<AdminRoute element={<AdminDashboard />} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;