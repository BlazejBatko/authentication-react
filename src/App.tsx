import "./App.css";
import Register from "./Register";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "@fontsource/advent-pro";
import "@fontsource/titan-one";
import "./Register.css";
import Login from "./Login";
import Home from "./Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/*",
      element: <Register />,
    },
  ]);

  return (
    <main className="App">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
