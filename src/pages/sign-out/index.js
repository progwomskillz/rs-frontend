import { useEffect } from "react";
import serviceAuth from "services/auth";

const SignOut = () => {
  useEffect(() => {
    const signOut = async () => serviceAuth.signOut();
    signOut();
  }, []);

  return <></>
}

export default SignOut;
