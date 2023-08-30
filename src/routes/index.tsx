import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../layouts/home";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import SignOut from "../pages/signout";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  {
    path: "dashboard",
    element: <Home />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
      path:"signout",
      element:<SignOut/>
  }
]);

export default router;
