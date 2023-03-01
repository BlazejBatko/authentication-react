import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import "@fontsource/advent-pro";
import "@fontsource/titan-one";
import "./Register.css";
import Login from "./Login";
import Home from "./Home";
import Layout from "./Layout";
import LinkPage from "./LinkPage";
import Unauthorized from "./Unauthorized";
import Editor from "./Editor";
import Admin from "./Admin";
import Lounge from "./Lounge";
import NotFound from "./NotFound";
import RequireAuth from "./RequireAuth";

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
    </Routes>
  );
}

export default App;
