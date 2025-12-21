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
import Camera from "./pages/camera";
import SearchPage from "./pages/SearchPage.tsx";
import { useAuthStore } from "@/store/authStore";

const App = () => {
  const location = useLocation();
  const { isAuthenticated, role } = useAuthStore();

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="home" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="landing" element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="about" element={<PageTransition><AboutUsPage /></PageTransition>} />
          <Route path="account-settings" element={<PageTransition><AccountSetting /></PageTransition>} />
          <Route path="blog" element={<PageTransition><BlogPage /></PageTransition>} />
          <Route path="camera" element={<PageTransition><Camera /></PageTransition>} />
          <Route path="documentation" element={<PageTransition><DocumentationPage /></PageTransition>} />
          <Route path="login" element={<PageTransition><LoginPage /></PageTransition>} />
          <Route path="register" element={<PageTransition><RegisterPage /></PageTransition>} />
          <Route path="reset-password" element={<PageTransition><ResetPasswordPage /></PageTransition>} />
          <Route 
            path="manage-users" 
            element={
              role?.toLowerCase() === 'admin' 
                ? <PageTransition><ManageUsersPage /></PageTransition> 
                : <Navigate to="/home" replace />
            } 
          />
          <Route path="search" element={<PageTransition><SearchPage /></PageTransition>} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/"} replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
