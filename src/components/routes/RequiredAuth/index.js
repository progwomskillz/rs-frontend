import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import serviceAuth from "services/auth";

const RequiredAuth = () => {
  const refreshToken = useSelector(state => state.auth.refresh);

  if (serviceAuth.isAuthed(refreshToken)) {
    return <Outlet />
  }

  return <Navigate to="/" />
}

export default RequiredAuth;
