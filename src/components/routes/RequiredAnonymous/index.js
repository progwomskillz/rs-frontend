import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import serviceAuth from "services/auth";

const RequiredAnonymous = () => {
  const refreshToken = useSelector(state => state.auth.refresh);

  if (serviceAuth.isAuthed(refreshToken)) {
    return <Navigate to="/cabinet" />
  }

  return <Outlet />
}

export default RequiredAnonymous;
