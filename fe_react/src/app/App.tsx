import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import AboutUsPage from "./pages/AboutUsPage.tsx";
import AccountSetting from "./pages/MyAccountPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import DocumentationPage from "./pages/DocumentationPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import Camera from "./pages/camera";
import SearchPage from "./pages/SearchPage.tsx";

const App = () => {
    return (
        <div>
            {" "}
            <Routes>
                <Route index element={<LandingPage />} />
                <Route path="home" element={<HomePage />} />
                <Route path="landing" element={<LandingPage />} />
                <Route path="about" element={<AboutUsPage />} />
                <Route path="account-settings" element={<AccountSetting />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="camera" element={<Camera />} />
                <Route path="documentation" element={<DocumentationPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="reset-password" element={<ResetPasswordPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
        </div>
    );
};

export default App;
