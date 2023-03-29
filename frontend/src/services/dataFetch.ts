import { TEvents, TEventsParticipants, TParticipants } from "../types";
import axios from "axios";
import * as AuthService from "../services/auth.service";
import { useEffect, useState } from "react";

export const LogOut = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  AuthService.logout();
  setIsLoggedIn(false);
};

export const GetEvents = (
  isAuthed: boolean,
  authed: { Authorization: string }
) => {
  const [events, setEvents] = useState<TEvents>([]);

  useEffect(() => {
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
  });
};

export const GetParticipants = (
  isAuthed: boolean,
  authed: { Authorization: string }
) => {
  const [participants, setParticipants] = useState<TParticipants>([]);

  useEffect(() => {
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
  });
};

export const GetEventsParticipants = (
  isAuthed: boolean,
  authed: { Authorization: string }
) => {
  const [eventsParticipants, setEventsParticipants] =
    useState<TEventsParticipants>([]);
  useEffect(() => {
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
  });
};
