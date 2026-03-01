// import { Img } from "../Img/img.js";
import { useState } from "react";
import "./Login.css";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

import { DoctorContext } from "../../context/DoctorContext";

const Login = () => {
  const [state, Setstate] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setaToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setaToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {}
  };
  return (
    <div className="modal">
      <form onSubmit={onSubmitHandler}>
        <div className="modal-dialog">
          <p className="login">
            <span>{state}</span> Login
          </p>
          <div>
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
            />
          </div>
          <div>
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
            />
          </div>
          <button className="btn-sumbit">Login</button>
          {state === "Admin" ? (
            <p className="click">
              Doctor Login?{" "}
              <span className="click-span" onClick={() => Setstate("Doctor")}>
                {" "}
                Click here
              </span>
            </p>
          ) : (
            <p className="click">
              Admin Login?{" "}
              <span className="click-span" onClick={() => Setstate("Admin")}>
                {" "}
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
