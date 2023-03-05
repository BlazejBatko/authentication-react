import { createContext, useMemo, useState } from "react";
type Auth = {
  setAuth?: (
    auth:
      | {
          user?: string;
          pwd?: string;
          accessToken?: string;
          roles?: number[];
        }
      | ((prev: {
          user?: string;
          pwd?: string;
          accessToken?: string;
          roles?: number[];
        }) => {
          user?: string;
          pwd?: string;
          accessToken?: string;
          roles?: number[];
        })
  ) => void | undefined;

  auth?: {
    user?: string;
    pwd?: string;
    accessToken?: string;
    roles?: number[];
  };
  persist?: boolean;
  setPersist?: (persist: (prev: boolean) => boolean)=> void;
};

const AuthContext = createContext<Auth>({}); // Create a context

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({});
  const persistLS = localStorage.getItem("persist");

  const [persist, setPersist] = useState(
    persistLS !== null ? JSON.parse(persistLS) : false
  );
  const contextValue = useMemo(
    () => ({ auth, setAuth, persist, setPersist }),
    [auth, setAuth, persist, setPersist]
  ); // Memoize the context value

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext };
