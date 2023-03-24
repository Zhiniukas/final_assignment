import axios from "axios";
import { TParticipants } from "../types";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5001/";

export const getParticipantList = () => {
  return axios.get(API_URL + "participants", { headers: authHeader() });
};

export const getParticipantEvents = (participantId: number) => {
  return axios.get(API_URL + "participants/" + participantId, {
    headers: authHeader(),
  });
};

export const addParticipantEvent = (participantData: TParticipants) => {
  return axios
    .post(API_URL + "participants/", {
      headers: authHeader(),
      participantData,
    })
    .then((response) => {
      return response.data;
    });
};
