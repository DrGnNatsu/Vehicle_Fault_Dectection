import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/home.tsx";
import About from "./pages/about.tsx";
import AccountSetting from "./pages/account_setting.tsx";
import Blog from "./pages/blog.tsx";
import Camera from "./pages/Camera.tsx";
import Documentation from "./pages/documentation.tsx";
import LandingPage from "./pages/landingPage.tsx";

import { Login, Registration, Reset1, Reset2, Reset3 } from "./auth/auth.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "home", element: <Home /> },
      { path: "landing", element: <LandingPage /> },
      { path: "about", element: <About /> },
      { path: "account-settings", element: <AccountSetting /> },
      { path: "blog", element: <Blog /> },
      { path: "camera", element: <Camera /> },
      { path: "documentation", element: <Documentation /> },

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
      { path: "*", element: <Home /> },
    ],
  },
]);

export default router;
