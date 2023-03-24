import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5001/";

export const getEvents = () => {
  return axios.get(API_URL + "events");
};

export const getEventParticipants = (eventId: number) => {
  return axios.get(API_URL + "events/" + eventId, { headers: authHeader() });
};
