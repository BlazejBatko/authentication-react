import { createContext, useMemo, useState } from "react";

type Auth = {
  setAuth?: (auth: {
    user?: string;
    pwd?: string;
    accessToken?: string;
    roles?: number[];
  }) => void;
  auth?: {
    user?: string;
    pwd?: string;
    accessToken?: string;
    roles?: number[];
  };
};

const AuthContext = createContext<Auth>({}); // Create a context

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({});
  const contextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]); // Memoize the context value

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext };
