import { Navigate } from "react-router-dom";
import serviceAuth from "services/auth";

const Cabinet = () => {
  return <Navigate to={`/${serviceAuth.getPrincipalRole()}`} />;
};

export default Cabinet;
