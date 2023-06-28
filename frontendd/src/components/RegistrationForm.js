import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  async function post() {
    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, email }),
      });

      const result = await response.json();

      if(result.id){
        setName("")
        setPassword("")
        setEmail("")
        alert('Account created succesfully')
        history.push('/login')
      } else{
        alert(result.message)
      }
    } catch (error) {
        alert('Error :' + error)
    }
  }

  return (
    <div class="loginForm">
      <h1>Registration</h1>
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
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex">
        <button onClick={post}>Create</button>
        <button
          onClick={() => {
            history.push("/login");
          }}
        >
          Back to login
        </button>
      </div>
    </div>
  );
}

export default RegistrationForm;
