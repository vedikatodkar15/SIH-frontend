import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { AppProvider } from './context/AppContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { GovernmentLayout } from './components/GovernmentLayout';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Fleet } from './pages/Fleet';
import { GISMap } from './pages/GISMap';
import { AIAnalytics } from './pages/AIAnalytics';
import { DemandPrediction } from './pages/DemandPrediction';
import { TrafficRoutes } from './pages/TrafficRoutes';
import { AlertsIncidents } from './pages/AlertsIncidents';
import { PassengerPortal } from './pages/PassengerPortal';
import { Reports } from './pages/Reports';
import { DataAPIs } from './pages/DataAPIs';
import { Administration } from './pages/Administration';
import { NotFound } from './pages/NotFound';

// Styles
import './styles/variables.css';
import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/responsive.css';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Secure Authentication Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Government Intelligence Portal Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <GovernmentLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="fleet" element={<Fleet />} />
              <Route path="map" element={<GISMap />} />
              <Route path="analytics" element={<AIAnalytics />} />
              <Route path="demand" element={<DemandPrediction />} />
              <Route path="traffic" element={<TrafficRoutes />} />
              <Route path="alerts" element={<AlertsIncidents />} />
              <Route path="passenger" element={<PassengerPortal />} />
              <Route path="reports" element={<Reports />} />
              <Route path="apis" element={<DataAPIs />} />
              <Route path="admin" element={<Administration />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Fallback to Login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
