import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5001/";

export const participantRemove = (pId: number | null, eId: number | null) => {
  console.log(API_URL + "remove-participant");
  return axios
    .post(
      API_URL + "remove-participant",
      { participantId: pId, eventId: eId },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
};
