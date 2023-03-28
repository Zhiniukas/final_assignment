import { useContext, useState } from "react";
import { useLocation } from "react-router";
import { EventsContext } from "../../context/EventsContext";
import { Grid, Typography, Box, Button } from "@mui/material";
import { EventParticipantsContext } from "../../context/EventsParticipantsContext";
import { participantRemove } from "../../services/participantRemove";

export const Events = () => {
  const location = useLocation();
  const [isEventSelected, setIsEventSelected] = useState<boolean>(false);
  const [eventNumber, setEventNumber] = useState<number>(0);

  const { events } = useContext(EventsContext);
  const { eventsParticipants, setEventsParticipants } = useContext(
    EventParticipantsContext
  );

  const handleClick = (eventIndex: number, showList: boolean) => {
    setEventNumber(eventIndex);
    setIsEventSelected(showList);
  };

  const removeRecord = (pId: number | null, eId: number | null) => {
    const updatedList = eventsParticipants.filter(
      (record) => record.eventId !== eId || record.participantId !== pId
    );
    setEventsParticipants(updatedList);
  };

  const handleDeleteParticipantClick = (
    participantIndex: number | null,
    eventIndex: number | null
  ) => {
    participantRemove(participantIndex, eventIndex);
    removeRecord(participantIndex, eventIndex);
  };

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
