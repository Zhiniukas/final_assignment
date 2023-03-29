import { useState, useContext } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import {
  Grid,
  Select,
  Box,
  Button,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { TEvents } from "../../types";

export const AddParticipant = () => {
  const [events, setEvents] = useState<TEvents>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [eventId, setEventId] = useState("");

  const handleParticipantSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();

    const authed = authHeader();

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
      .then((result) =>
        console.info(`Participant added successfully! ${result}`)
      )
      .catch((error) => console.error(error));
  };

  const eventOptions = events.map((e, key) => (
    <option value={e.id} key={key}>
      {e.title}
    </option>
  ));

  return (
    <Box
      component={"form"}
      onSubmit={handleParticipantSubmit}
      key={1}
      textAlign="center"
      margin="0 auto"
      width="90%"
    >
      <Grid>
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input
              sx={{
                width: 200,
                height: 50,
              }}
              id="firstName"
              type={"text"}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input
              sx={{
                width: 200,
                height: 50,
              }}
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              sx={{
                width: 200,
                height: 50,
              }}
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="birthDate">Date of Birth</InputLabel>
            <Input
              sx={{
                width: 200,
                height: 50,
              }}
              id="birthDate"
              type="Date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="eventId">Select event</InputLabel>
            <Select
              name="eventId"
              placeholder="Enter Car Brand"
              sx={{
                width: 200,
                height: 50,
              }}
              value={eventId}
              onChange={(event) => setEventId(event.target.value)}
            >
              {eventOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <Button
              sx={{
                width: 200,
                height: 50,
              }}
              type="submit"
              size="small"
            >
              Add new participant
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
