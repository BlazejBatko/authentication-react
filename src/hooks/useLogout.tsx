import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth!({});
    try {
      const response = await axios("/logout", {
        withCredentials: true, // This is required to send the cookie with the request
      });
    } catch (e) {
      console.log(e);
    }
  };

  return logout;
};

export default useLogout;