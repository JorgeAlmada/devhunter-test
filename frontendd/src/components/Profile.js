import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    post()
  }, []);

  async function post() {
    const tokenstr = localStorage.getItem("token")
    console.log(tokenstr)

    try {
      const response = await fetch("http://localhost:8080/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify({ id: localStorage.getItem("userId") }),
      });

      const result = await response.json();
      console.log(result)
      setName(result.name);
      setEmail(result.email);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <p><b>Name: </b>{name}</p>
      <p><b>Email: </b>{email}</p>
    </div>
  );
}

export default Profile;