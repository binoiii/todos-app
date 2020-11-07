import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const authenticated = localStorage.getItem("authenticated");
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={LandingPage} />
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
