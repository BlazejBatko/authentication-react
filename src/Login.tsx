import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthProvider";


import axios from "./api/axios";
import { Link } from "react-router-dom";

function Login() {
  const {setAuth} = useContext(AuthContext);

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const LOGIN_URL = "/auth";
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pass]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user: user, pwd: pass }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response?.data))
      setUser("");
      setPass("");

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth!({ user, pwd: pass, roles, accessToken });

    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
    errRef.current?.focus(); // focus on error message for screen readers
  };

  return (
    <div className="App">
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign in</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <label htmlFor="password">Username</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            required
          />

          <button type="submit">Sign in</button>
        </form>
        <p>
          Need an Account? <br />
          <span className="line">
            <Link to="/register">Sign up</Link>
          </span>
        </p>
      </section>
    </div>
  );
}

export default Login;
