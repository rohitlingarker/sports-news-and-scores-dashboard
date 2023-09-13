import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../layouts/home";
import Signin from "../components/signin";
import Signup from "../components/signup";
import LiveMatches from "../components/liveMatches";
import Articles from "../components/articles";
import Signout from "../components/signout";
import Favourites from "../components/favourites";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  {
    path: "dashboard",
    element: <Home />,
    children:[
      {index:true, element:<>
      <LiveMatches/>
      <div className="grid gap-2 mt-3 bg-gray-300 p-4 rounded-lg grid-cols-12">
        <Articles/>
        <Favourites/>
      </div>
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
  },
  {
    path:"signout",
    element:<Signout/>,

  }
]);

export default router;
