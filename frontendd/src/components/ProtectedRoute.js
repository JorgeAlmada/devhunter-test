import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function ProtectedRoute({ component }) {
  const history = useHistory();
  const isAuth = localStorage.getItem("isAuth");

  useEffect(() => {
    if (!isAuth) {
      history.push("/login");
    }
  }, [component]);

  const checkRender = () => {
    if (isAuth) {
      return component;
    } else {
      history.push("/login");
    }
  };

  return checkRender();
}

export default ProtectedRoute;
