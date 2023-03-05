import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

function Login() {
  const { setAuth} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [user, resetUser, userAttribs] = useInput('user', '');
  const [pass, setPass] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle('persist', false)
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

      resetUser();
      setPass("");

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth!({ user, pwd: pass, roles, accessToken });
      setPass("");
      navigate(from, { replace: true });
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
            {...userAttribs}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            required
          />

          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={toggleCheck}
              checked={check}
            />
            <label htmlFor="persist">Trust this Device</label>
          </div>
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
