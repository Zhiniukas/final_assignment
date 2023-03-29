import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Events } from "../Events/Events";
import { HeaderAuthed, HeaderNotAuthed } from "../Header/Header";
import { Login, Logout } from "../Login";
import { Participants } from "../Participants/Participants";
import { AddParticipant } from "../Participants/AddParticipant";
import { TEvents, TEventsParticipants, TParticipants } from "../../types";

import { NotFoundPage } from "../NotFoundPage";
import eventBus from "../../common/EventBus";
import * as AuthService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
import axios from "axios";

export const MainRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  let authed = authHeader();

  const [events, setEvents] = useState<TEvents>([]);
  const [eventsParticipants, setEventsParticipants] =
    useState<TEventsParticipants>([]);
  const [participants, setParticipants] = useState<TParticipants>([]);

  const logOut = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  const GetEvents = (isAuthed: boolean) => {
    axios
      .get("http://localhost:5001/events", {
        headers: authed,
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          if (isAuthed) {
            setEvents(res.data);
          } else {
            setEvents([]);
          }
        }
      })

      .catch((error) => console.error(error));
  };

  const GetParticipants = (isAuthed: boolean) => {
    axios
      .get("http://localhost:5001/participants", {
        headers: authed,
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          if (isAuthed) {
            setParticipants(res.data);
          } else {
            setParticipants([]);
          }
        }
      })

      .catch((error) => console.error(error));
  };

  const GetEventsParticipants = (isAuthed: boolean) => {
    axios
      .get("http://localhost:5001/event-participants", {
        headers: authed,
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          if (isAuthed) {
            setEventsParticipants(res.data);
          } else {
            setEventsParticipants([]);
          }
        }
      })

      .catch((error) => console.error(error));
  };

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

  useEffect(() => {
    if (isLoggedIn) {
      GetEvents(isLoggedIn);
      GetParticipants(isLoggedIn);
      GetEventsParticipants(isLoggedIn);
    }
  }, [isLoggedIn]);

  // const [events, setEvents] = useState<TEvents[]>([]);
  // const [participants, setParticipants] = useState<TParticipants[]>([]);
  // const [eventsParticipants, setEventsParticipants] = useState<
  //   TEventsParticipants[]
  // >([]);

  return (
    <BrowserRouter>
      {isLoggedIn ? <HeaderAuthed /> : <HeaderNotAuthed />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Events />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<Events />} />
            <Route path="/addParticipant" element={<AddParticipant />} />
            <Route path="/participants" element={<Participants />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />{" "}
          </>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
