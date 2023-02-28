import { createContext, useMemo, useState } from "react";



const AuthContext = createContext({}); // Create a context

type Props = {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: Props ) => {
  const [auth, setAuth] = useState<{user?: string, pwd?: string, accessToken?: string, roles?: string[]}>({});
  const contextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]); // Memoize the context value

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export {AuthContext};