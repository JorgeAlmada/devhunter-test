import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function post() {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if(result.userData){
        localStorage.setItem('isAuth', true);
        localStorage.setItem('userId', result.userData.id)
        localStorage.setItem('token', result.token)
        history.push('/profile')
      } else{
        alert(result.message)
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="loginForm">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex">
        <button onClick={post}>Login</button>
        <button
          onClick={() => {
            history.push("/registration");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
