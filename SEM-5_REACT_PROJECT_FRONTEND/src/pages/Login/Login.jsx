import React, { useContext, useState } from "react";
import "./Login.css";
import { Appcontext } from "../../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const { backendUrl, token, setToken } = useContext(Appcontext);
  const [showModal, setShowModal] = useState(true); // controls modal visibility
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully");
          setShowModal(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setShowModal(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!showModal) return null; // don't render modal if closed

  return (
    <div className="modal" role="dialog" aria-modal="true">
 
      <div className="modal-dialog">
        {/* Close button */}
        <button
          className="modal-close"
          aria-label="Close"
          onClick={() => setShowModal(false)} // hide modal
        >
          &times;
        </button>

        <h2>{state === "Sign Up" ? "Create Account" : "Login"}</h2>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="input-group">
              <span className="icon">👤</span>
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            {state}
          </button>
        </form>

        <p className="footer-text">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span className="toggle-link" onClick={() => setState("Login")}>
                Log in
              </span>
            </>
          ) : (
            <>
              Create a new account?{" "}
              <span className="toggle-link" onClick={() => setState("Sign Up")}>
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
