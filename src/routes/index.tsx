import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../layouts/home";
import Signin from "../components/signin";
import Signup from "../components/signup";
import LiveMatches from "../components/liveMatches";
import Articles from "../components/articles";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  {
    path: "dashboard",
    element: <Home />,
    children:[
      {index:true, element:<>
      <LiveMatches/>
      <Articles/>
      </>}
    ]
  },
  {
    path: "signin",
    element: <Home/>,
    children : [
      { index: true ,element:<Signin />}
      ]
  },
  {
    path: "signup",
    element: <Home/>,
    children :[
      { index: true  ,element:<Signup />}
      ]
  }
]);

export default router;
