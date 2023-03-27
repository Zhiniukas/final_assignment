import axios from "axios";
import { useContext } from "react";
import { EventsContext } from "../context/EventsContext";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5001/";

export const GetEventsData = (isAuthed: boolean) => {
  const { events, setEvents } = useContext(EventsContext);
  return axios
    .get(API_URL + "events")
    .then((res) => {
      if (Array.isArray(res.data)) {
        if (isAuthed) {
          setEvents(res.data);
        } else {
          setEvents([]);
        }
        console.log(events);
      }
    })
    .catch((error) => console.error(error));
};

export const getEventParticipants = (eventId: number) => {
  return axios.get(API_URL + "events/" + eventId, { headers: authHeader() });
};
