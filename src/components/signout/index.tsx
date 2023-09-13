import { useEffect } from "react";
import { Navigate } from "react-router-dom"
import { usePreferencesDispatch } from "../../context/preferences/context";
import { emptyPreferences } from "../../context/preferences/actions";

const Signout = () => {
    const preferencesDispatch = usePreferencesDispatch();
  useEffect(() => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    if (preferencesDispatch)emptyPreferences(preferencesDispatch)
  }, [])
  
  return <Navigate to="/dashboard" />;
}
export default Signout;