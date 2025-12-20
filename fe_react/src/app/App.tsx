import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Home from "./pages/home";
import About from "./pages/about";
import AccountSetting from "./pages/account_setting";
import Blog from "./pages/blog";

import Documentation from "./pages/documentation";
import { Login, Registration, Reset1, Reset2, Reset3 } from "./auth/auth";
import Camera from "./pages/camera";

const App = () => {
  return (
    <div>
      {" "}
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="home" element={<Home />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="about" element={<About />} />
        <Route path="account-settings" element={<AccountSetting />} />
        <Route path="blog" element={<Blog />} />
        <Route path="camera" element={<Camera />} />
        <Route path="documentation" element={<Documentation />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="reset1" element={<Reset1 />} />
        <Route path="reset2" element={<Reset2 />} />
        <Route path="reset3" element={<Reset3 />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
