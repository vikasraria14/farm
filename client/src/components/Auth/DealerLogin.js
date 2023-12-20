import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "../../App";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(`${config.endpoint}/adminLogin`, {
        username: email,
        password: password,
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
            localStorage.setItem("userType", "admin");
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("username", res.data.user[0].username)
            // setIsAuthenticated(true);
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour in milliseconds

            Cookies.set("token", res.data.token, {
              expires: expirationDate,
            });
            
            Swal.fire({
              icon: "success",
              title: "Successfully logged in!",
              showConfirmButton: false,
              timer: 1500,
            });
            
            navigate("/complaintsAdmin");
            window.location.reload(false);
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
              text: "Incorrect email or password.",
              showConfirmButton: true,
            });
          },
        });
      }
    } catch (error) {
      console.error("Login failed:", error);

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
        <h1>Dealer Login</h1>
        <label htmlFor="email">Username</label>
        <input
          id="email"
          type="username"
          name="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <input style={{ marginTop: "12px" }} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
