import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import * as AuthService from "./services/auth.service";

import Login from "./components/Login";
import EventBus from "./common/EventBus";
import { Events } from "./components/Events";
import { Participants } from "./components/Participants";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setIsLoggedIn(true);
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setIsLoggedIn(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Participant registration
        </Link>

        {isLoggedIn ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/events"} className="nav-link">
                Event list
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/participants"} className="nav-link">
                Participants list
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/participants" element={<Participants />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
