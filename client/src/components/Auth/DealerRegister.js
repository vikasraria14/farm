import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {config} from "../../App";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom"
const Register = ({  }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();

    if(password!=confirmPassword)
    {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Passwords do not match",
            showConfirmButton: true,
          });
        },
      });
    }

    try {
      let res = await axios.post(`${config.endpoint}/adminRegistration`, {
        username: username,
        name: email,
        password: password,
        userType:"admin"
      });
      

      if (!res.data.err) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem("is_authenticated", true);
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); 

            Cookies.set("token", res.data.token, {
              expires: expirationDate,
            });
            Swal.fire({
              icon: "success",
              title: "Successfully Registered!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate('/userLogin')
          },
        });
      } else {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: res.data.err,
              showConfirmButton: true,
            });
          },
        });
      }
    } catch (error) {
      console.error("Register failed:", error);

      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Incorrect email or password.",
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <div className="small-container content">
      <form onSubmit={handleLogin}>
        <h1>Dealer Register</h1>
        <label htmlFor="email">Name</label>
        <input
          id="email"
          type="text"
          name="email"
          placeholder="Full Name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="username"
          name="username"
          placeholder="admin123"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="qwerty"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          id="password"
          type="password"
          name="confirmpassword"
          placeholder="qwerty"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input style={{ marginTop: "12px" }} type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
