import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";


function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  const { auth } = useAuth();
  const [persist] = useLocalStorage('persist', false);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (e) {
        console.log(e);
      } finally {
        isMounted && setIsLoading(false); // no matter what, set isLoading to false
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`AT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);
  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
}

export default PersistLogin;
