import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route path="/registration">
            <RegistrationForm />
          </Route>
          <Route path="/profile">
            <ProtectedRoute component={<Profile/>}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
