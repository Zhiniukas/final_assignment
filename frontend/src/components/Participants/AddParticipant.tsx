import { useState, useEffect, useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import { typography } from "@mui/system";
import { TParticipants } from "../../types";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { EventsContext } from "../../context/EventsContext";
import { title } from "process";

type Props = {};

export const AddParticipant = () => {
  const { events } = useContext(EventsContext);
  //   const [newStudent, setNewStudent] = useState<any[]>([]); // todo vienas

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [eventId, setEventId] = useState("");

  const handleParticipantSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    const authed = authHeader();
    console.log(authed);
    console.log(authHeader());
    console.log(firstName, lastName, email, birthDate, eventId);

    axios
      .post(
        "http://localhost:5001/add-participant",
        {
          firstName,
          lastName,
          email,
          birthDate,
          eventId,
        },
        {
          headers: authed,
        }
      )
      .then((result) => alert(`Participant added successfully! ${result}`))
      .catch((error) => console.error(error));
  };

  const eventOptions = events.map((e, key) => (
    <option value={e.id} key={key}>
      {e.title}
    </option>
  ));

  return (
    <form onSubmit={handleParticipantSubmit}>
      <label>
        First Name
        <input
          type={"text"}
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </label>
      <label>
        Last Name
        <input
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </label>
      <label>
        Email
        <input
          type={"email"}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Date of Birth
        <input
          type={"Date"}
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
        />
      </label>
      <label>
        Select Event:
        <select
          name="eventId"
          value={eventId}
          onChange={(event) => setEventId(event.target.value)}
        >
          <option value={""} disabled>
            --Pick Event--
          </option>
          {eventOptions}
        </select>
      </label>

      <button>Add new participant</button>
    </form>
  );
};
