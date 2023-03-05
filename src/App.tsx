import { Route, Routes } from "react-router-dom";
import "@fontsource/advent-pro";
import "@fontsource/titan-one";
import "./components/Register.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import LinkPage from "./components/LinkPage";
import Unauthorized from "./components/Unauthorized";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Lounge from "./components/Lounge";
import NotFound from "./components/NotFound";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/linkpage" element={<LinkPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          {/* PersistLogin is a wrapper component that checks if the user has a valid refresh token. If not, it redirects to the login page. */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Editor]}
              />
            }
          >
            {/* RequireAuth is a wrapper component that checks if the user is logged in. If not, it redirects to the login page. */}
            <Route path="/" element={<Home />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="/editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="/lounge" element={<Lounge />} />
          </Route>
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
