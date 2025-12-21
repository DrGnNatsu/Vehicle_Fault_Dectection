import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import LandingPage from "./pages/LandingPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import AboutUsPage from "./pages/AboutUsPage.tsx";
import AccountSetting from "./pages/MyAccountPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import DocumentationPage from "./pages/DocumentationPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import ManageUsersPage from "./pages/ManageUsersPage.tsx";
import RulesPage from "./pages/admin/RulesPage.tsx";
import ViolationsPage from "./pages/admin/ViolationsPage.tsx";
import ZonesPage from "./pages/admin/ZonesPage.tsx";
import AssignCamerasPage from "./pages/admin/AssignCamerasPage.tsx";
import SourceManagerPage from "./pages/admin/SourceManagerPage.tsx";
import SourceDetailPage from "./pages/admin/SourceDetailPage.tsx";
import Camera from "./pages/camera";
import SearchPage from "./pages/SearchPage.tsx";
import { useAuthStore } from "@/store/authStore";
import ProtectedRoute from "@/components/ProtectedRoute";

const Logout = () => {
  const { clearAuth } = useAuthStore();
  useEffect(() => {
    clearAuth();
  }, [clearAuth]);
  return <Navigate to="/login" replace />;
};

const App = () => {
  const location = useLocation();
  const { isAuthenticated, role } = useAuthStore();

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route
            index
            element={
              <PageTransition>
                <LandingPage />
              </PageTransition>
            }
          />
          <Route
            path="landing"
            element={
              <PageTransition>
                <LandingPage />
              </PageTransition>
            }
          />
          <Route
            path="about"
            element={
              <PageTransition>
                <AboutUsPage />
              </PageTransition>
            }
          />
          <Route
            path="blog"
            element={
              <PageTransition>
                <BlogPage />
              </PageTransition>
            }
          />
          <Route
            path="documentation"
            element={
              <PageTransition>
                <DocumentationPage />
              </PageTransition>
            }
          />
          <Route
            path="login"
            element={
              <PageTransition>
                <LoginPage />
              </PageTransition>
            }
          />
          <Route
            path="register"
            element={
              <PageTransition>
                <RegisterPage />
              </PageTransition>
            }
          />
          <Route
            path="reset-password"
            element={
              <PageTransition>
                <ResetPasswordPage />
              </PageTransition>
            }
          />
          <Route path="logout" element={<Logout />} />

          {/* Protected Routes - Police & Admin */}
          <Route
            path="home"
            element={
              <ProtectedRoute allowedRoles={["admin", "police"]}>
                <PageTransition>
                  <HomePage />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="camera/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "police"]}>
                <PageTransition>
                  <SourceDetailPage />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - User, Police & Admin */}
          <Route
            path="search"
            element={
              <ProtectedRoute allowedRoles={["admin", "police", "user"]}>
                <PageTransition>
                  <SearchPage />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="account-settings"
            element={
              <ProtectedRoute allowedRoles={["admin", "police", "user"]}>
                <PageTransition>
                  <AccountSetting />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Admin Only */}
          <Route
            path="manage-users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PageTransition>
                  <ManageUsersPage />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="rules"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PageTransition>
                  <RulesPage />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="violations"
            element={
              <ProtectedRoute allowedRoles={["admin", "police"]}>
                <PageTransition>
                  <ViolationsPage />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="zones"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PageTransition>
                  <ZonesPage />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="assignments"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PageTransition>
                  <AssignCamerasPage />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="sources"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PageTransition>
                  <SourceManagerPage />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="sources/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PageTransition>
                  <SourceDetailPage />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* Wildcard / Re-routing */}
          <Route
            path="*"
            element={
              <Navigate
                to={
                  !isAuthenticated
                    ? "/"
                    : role?.toLowerCase() === "user"
                    ? "/search"
                    : "/home"
                }
                replace
              />
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
