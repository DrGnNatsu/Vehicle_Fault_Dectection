import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> }, // Set Home as the default route
      { path: "home", element: <Home /> },
    ],
  },
]);

export default router;
