import { useEffect, useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { TEvents, TEventsParticipants, TParticipants } from "../../types";
import eventBus from "../../common/EventBus";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";
import {
  GetEvents,
  GetEventsParticipants,
  GetParticipants,
  LogOut,
} from "../../services/dataFetch";
import { handleDeleteParticipantClick } from "../../services/deleteParticipantEvent";

export const Participants = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  let authed = authHeader();

  const [isParticipantSelected, setIsParticipantSelected] =
    useState<boolean>(false);
  const [participantNumber, setParticipantNumber] = useState<number>(0);
  const [eventsParticipants, setEventsParticipants] =
    useState<TEventsParticipants>([]);
  const [events, setEvents] = useState<TEvents>([]);

  const [participants, setParticipants] = useState<TParticipants>([]);

  const handleClick = (participantId: number, showList: boolean) => {
    setParticipantNumber(participantId);
    setIsParticipantSelected(showList);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setIsLoggedIn(true);
    }

    eventBus.on("logout", LogOut);

    return () => {
      eventBus.remove("logout", LogOut);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      GetEvents(isLoggedIn, authed);
      GetParticipants(isLoggedIn, authed);
      GetEventsParticipants(isLoggedIn, authed);
    }
  }, [isLoggedIn]);

  return (
    <Box key={"Participants"} textAlign="center" margin="0 auto" width="90%">
      {participants.map((participant, i) => (
        <Grid
          key={participant.participantId}
          aria-label="Event list"
          item
          xs={12}
          container
          padding="10px"
          justifyContent="space-between"
          bgcolor="cream"
          border="1px solid black"
          mx="auto"
          sx={{ "& MuiTypography-root": { fontSize: "20px" } }}
        >
          <Grid item xs={1}>
            <Typography aria-label="participant id">
              {participant.participantId}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography aria-label="participant ifirst named">
              {participant.firstName}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography aria-label="participant last name">
              {participant.lastName}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography aria-label="participant email">
              {participant.email}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography aria-label="participant birth date">
              {participant.birthDate}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography aria-label="participant age">
              {participant.age}
            </Typography>
          </Grid>
          <Grid item xs={3}></Grid>

          {participant.participantId === participantNumber &&
          isParticipantSelected ? (
            <>
              <Grid item xs={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleClick(participant.participantId, false)}
                >
                  Hide list
                </Button>
              </Grid>

              {eventsParticipants
                .filter(
                  (participant) =>
                    participant.participantId === participantNumber
                )
                .map((filteredParticipant, j) => (
                  <Grid
                    width="90%"
                    key={filteredParticipant.eventId + " " + j}
                    aria-label="Participanr"
                    item
                    xs={12}
                    container
                    padding="10px"
                    justifyContent="space-between"
                    bgcolor="lightgray"
                    border="1px dotted black"
                    mx="auto"
                    sx={{
                      "& MuiTypography-root": {
                        fontSize: "15px",
                      },
                    }}
                  >
                    <>
                      <Grid item xs={3}></Grid>
                      <Grid item xs={1}>
                        <Typography aria-label="event id">
                          {filteredParticipant.eventId}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography aria-label="event name">
                          {filteredParticipant.eventName}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography aria-label="event description">
                          {filteredParticipant.eventDescription}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography aria-label="event date">
                          {filteredParticipant.eventDate}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography aria-label="event place">
                          {filteredParticipant.eventPlace}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() =>
                            handleDeleteParticipantClick(
                              participantNumber,
                              filteredParticipant.eventId
                            )
                          }
                        >
                          Delete Event
                        </Button>
                      </Grid>
                    </>
                  </Grid>
                ))}
            </>
          ) : (
            <>
              <Grid item xs={1}>
                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  onClick={() => handleClick(participant.participantId, true)}
                >
                  Event list
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      ))}
    </Box>
  );
};
