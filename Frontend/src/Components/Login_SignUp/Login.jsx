import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../../App.css";
import { useDispatch } from "react-redux";
import { setToken } from "../../Redux/Slice/CartSlice";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../../Redux/Slice/GetUserSlice";

function Login() {
  const [userDetail, setUserDetail] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        ...userDetail,
      });

      // console.log(response)
      // if (response.status === 200) {
      //   toast.success("Login Successfully!");
      //   setUserDetail({});
      //   dispatch(setToken(response.data.token));
      //   // localStorage.setItem("token", response.data.token)
      //   navigate("/");
      // }

      if (response.status === 200) {
        toast.success("Login Successfully!");
        setUserDetail({});
        const token = response.data.token;
        dispatch(setToken(token)); 
        const decoded = jwtDecode(token); 
        dispatch(getUser(decoded.id)); 
        navigate("/"); 
      }

    } catch (error) {
      console.log("error", error);
      console.log("response.data.message", error.response.data.message);
      toast.error(error.response.data.message || "Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="auth-container">
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              onChange={(e) =>
                setUserDetail({
                  ...userDetail,
                  email: e.target.value,
                })
              }
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              placeholder="Enter Password"
              name="Password"
              required
              onChange={(e) =>
                setUserDetail({
                  ...userDetail,
                  password: e.target.value,
                })
              }
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
