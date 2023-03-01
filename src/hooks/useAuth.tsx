import { useContext } from "react";
import { AuthContext } from "../../src/context/AuthProvider";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth
