import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import AboutUsPage from "./pages/AboutUsPage.tsx";
import AccountSetting from "./pages/MyAccountPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import Camera from "./pages/Camera.tsx";
import DocumentationPage from "./pages/DocumentationPage.tsx";
import LandingPage from "./pages/landingPage.tsx";

import { Login, Registration, Reset1, Reset2, Reset3 } from "./auth/auth.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "home", element: <HomePage /> },
      { path: "landing", element: <LandingPage /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "account-settings", element: <AccountSetting /> },
      { path: "blog", element: <BlogPage /> },
      { path: "camera", element: <Camera /> },
      { path: "documentation", element: <DocumentationPage /> },

      // ✅ FIX: Auth Routes
      // 1. Removed 'element: <Auth />' because the 'AuthLayout' is now inside the pages.
      // 2. Updated paths to match the Links used in your component (e.g. to="/registration")
      //    Note: If you want these nested under "/auth", you must update the Links in auth.tsx
      //    to point to "/auth/registration" etc.
      { path: "login", element: <Login /> },
      { path: "registration", element: <Registration /> },
      { path: "reset1", element: <Reset1 /> },
      { path: "reset2", element: <Reset2 /> },
      { path: "reset3", element: <Reset3 /> },

      // fallback
      { path: "*", element: <HomePage /> },
    ],
  },
]);

export default router;
