import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Events } from "../Events/Events";
import { HeaderAuthed, HeaderNotAuthed } from "../Header/Header";
import { Login, Logout } from "../Login";
import { Participants } from "../Participants/Participants";
import * as AuthService from "../../services/auth.service";
import eventBus from "../../common/EventBus";
import { useEffect, useState } from "react";

export const MainRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setIsLoggedIn(true);
    }

    eventBus.on("logout", logOut);

    return () => {
      eventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };
  return (
    <BrowserRouter>
      {isLoggedIn} ?
      <HeaderAuthed />
      :
      <HeaderNotAuthed />
      <div className="container mt-3">
        <Routes>
          {isLoggedIn} ? (
          <Route path="/" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/events" element={<Events />} />
          <Route path="/participants" element={<Participants />} />
          ) :(
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />)
        </Routes>
      </div>
    </BrowserRouter>
  );
};
