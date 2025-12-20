import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import Home from "./pages/Home.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import AccountSetting from "./pages/MyAccount.tsx";
import Blog from "./pages/Blog.tsx";
import Documentation from "./pages/documentation";
import {Login, Registration, Reset1, Reset2, Reset3} from "./auth/auth";
import Camera from "./pages/camera";
import Search from "./pages/Search.tsx";
import DocumentationPage from "./pages/DocumentationPage";

const App = () => {
    return (
        <div>
            {" "}
            <Routes>
                <Route index element={<LandingPage />} />
                <Route path="documentation_page" element={<DocumentationPage />} />
                <Route path="home" element={<Home />} />
                <Route path="landing" element={<LandingPage />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="account-settings" element={<AccountSetting />} />
                <Route path="blog" element={<Blog />} />
                <Route path="camera" element={<Camera />} />
                <Route path="documentation" element={<Documentation />} />
                <Route path="login" element={<Login />} />
                <Route path="registration" element={<Registration />} />
                <Route path="reset1" element={<Reset1 />} />
                <Route path="reset2" element={<Reset2 />} />
                <Route path="reset3" element={<Reset3 />} />
                <Route path="search" element={<Search />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </div>
    );
};

export default App;
