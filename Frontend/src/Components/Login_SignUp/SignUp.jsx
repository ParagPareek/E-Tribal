import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import toast from "react-hot-toast";

function SignUp() {
  const [userDetail, setuserDetail] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        ...userDetail,
      });

      if (response.status === 200) {
        toast.success("SignUp Successfully!, Please Login");
        setuserDetail({});
        navigate("/login");
      }

      console.log(response);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message || "Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="auth-container">
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              placeholder="Enter name"
              // required
              onChange={(e) =>
                setuserDetail({
                  ...userDetail,
                  name: e.target.value,
                })
              }
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              // required
              onChange={(e) =>
                setuserDetail({
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
              placeholder="Enter password"
              name="password"
              // required
              onChange={(e) =>
                setuserDetail({
                  ...userDetail,
                  password: e.target.value,
                })
              }
            />
          </label>
          <label>
            Conform Password:
            <input
              type="password"
              placeholder="Conform Password"
              name="conformPassword"
              // required
              onChange={(e) =>
                setuserDetail({
                  ...userDetail,
                  conformPassword: e.target.value,
                })
              }
            />
          </label>
          <label>
            Select role:
            <select
              name="role"
              className="w-full p-2 my-2 border rounded "
              onChange={(e) =>
                setuserDetail({
                  ...userDetail,
                  role: e.target.value,
                })
              }
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
