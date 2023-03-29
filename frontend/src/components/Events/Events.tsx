import { useEffect, useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { TEvents, TEventsParticipants, TParticipants } from "../../types";
import * as AuthService from "../../services/auth.service";
import eventBus from "../../common/EventBus";
import {
  GetEvents,
  GetEventsParticipants,
  GetParticipants,
  LogOut,
} from "../../services/dataFetch";
import authHeader from "../../services/auth-header";
import { handleDeleteParticipantClick } from "../../services/deleteParticipantEvent";

export const Events = () => {
  let authed = authHeader();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [isEventSelected, setIsEventSelected] = useState<boolean>(false);
  const [eventNumber, setEventNumber] = useState<number>(0);

  const events = GetEvents(isLoggedIn, authed);
  const eventsParticipants = GetParticipants(isLoggedIn, authed);

  const handleClick = (eventIndex: number, showList: boolean) => {
    setEventNumber(eventIndex);
    setIsEventSelected(showList);
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
    <Box key={"events"} textAlign="center" margin="0 auto" width="90%">
      {events.map((event, i) => (
        <Grid
          key={event.id}
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
            <Typography aria-label="event id">{event.id}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography aria-label="event title">{event.title}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography aria-label="pevent description">
              {event.description}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography aria-label="event date">{event.date}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography aria-label="event place">{event.place}</Typography>
          </Grid>
          <Grid item xs={4}></Grid>
          {event.id === eventNumber && isEventSelected ? (
            <>
              <Grid item xs={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleClick(event.id, false)}
                >
                  Hide list
                </Button>
              </Grid>

              {eventsParticipants
                .filter((participant) => participant.eventId === eventNumber)
                .map((filteredParticipant, j) => (
                  <Grid
                    key={event.id}
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
                        fontSize: "50px",
                        width: "90%",
                      },
                    }}
                  >
                    <>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={1}>
                        <Typography aria-label="participant id">
                          {filteredParticipant.participantId}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography aria-label="participant first name">
                          {filteredParticipant.firstName}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography aria-label="participant last name">
                          {filteredParticipant.lastName}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography aria-label="participant email">
                          {filteredParticipant.email}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography aria-label="participant birth date">
                          {filteredParticipant.birthDate}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography aria-label="participant age">
                          {filteredParticipant.age}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography aria-label="participant eventId">
                          {filteredParticipant.eventId}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() =>
                            handleDeleteParticipantClick(
                              filteredParticipant.participantId,
                              eventNumber
                            )
                          }
                        >
                          Remove
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
                  onClick={() => handleClick(event.id, true)}
                >
                  Participants
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      ))}
    </Box>
  );
};
