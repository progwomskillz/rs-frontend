import { useState, useLayoutEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import RequiredAnonymous from "components/routes/RequiredAnonymous";
import RequiredAuth from "components/routes/RequiredAuth";
import Cabinet from "pages/cabinet";
import SignIn from "pages/sign-in";
import SignOut from "pages/sign-out";
import Admin from "pages/admin";
import CommunitySocialWorker from "pages/community-social-worker";
import PublicOfficial from "pages/public-official";
import serviceAuth from "services/auth";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const load = async () => {
      serviceAuth.loadTokens();
      if (serviceAuth.getTokens().refresh) {
        await serviceAuth.refresh();
      }
      setIsLoading(false);
    }
    load();
  }, [])

  if (isLoading) {
    return <></>
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route element={<RequiredAnonymous />}>
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route element={<RequiredAuth />}>
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/community-social-worker/*" element={<CommunitySocialWorker />} />
          <Route path="/public-official/*" element={<PublicOfficial />} />
          <Route path="/sign-out" element={<SignOut />} />
        </Route>
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App;
