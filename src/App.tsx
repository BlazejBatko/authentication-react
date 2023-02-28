import "./App.css";
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
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/lounge" element={<Lounge />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
