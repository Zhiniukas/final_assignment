import { useContext, useState } from "react";
import { useLocation } from "react-router";
import { EventParticipantsContext } from "../../context/EventsParticipantsContext";
import { ParticipantsContext } from "../../context/ParticipantsContext";
import { participantRemove } from "../../services/participantRemove";
import { Grid, Typography, Box, Button } from "@mui/material";

export const Participants = () => {
  const location = useLocation();
  const [isParticipantSelected, setIsParticipantSelected] =
    useState<boolean>(false);
  const [participantNumber, setParticipantNumber] = useState<number>(0);

  const { participants } = useContext(ParticipantsContext);

  const { eventsParticipants, setEventsParticipants } = useContext(
    EventParticipantsContext
  );

  const handleClick = (participantId: number, showList: boolean) => {
    setParticipantNumber(participantId);
    setIsParticipantSelected(showList);
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
    <Box key={location.key}>
      <Grid container>
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
            <Grid item xs={1}>
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

            {participant.participantId === participantNumber &&
            isParticipantSelected ? (
              <>
                <Grid item xs={1}>
                  <Button
                    onClick={() =>
                      handleClick(participant.participantId, false)
                    }
                  >
                    Hide Events list
                  </Button>
                </Grid>
                <Grid container>
                  {eventsParticipants
                    .filter(
                      (participant) =>
                        participant.participantId === participantNumber
                    )
                    .map((filteredParticipant, j) => (
                      <Grid
                        key={filteredParticipant.eventId + " " + j}
                        aria-label="Participanr"
                        item
                        xs={12}
                        container
                        padding="10px"
                        justifyContent="space-between"
                        bgcolor="cream"
                        border="1px dotted black"
                        mx="auto"
                        sx={{
                          "& MuiTypography-root": {
                            fontSize: "15px",
                          },
                        }}
                      >
                        <>
                          <Grid item xs={1}>
                            <Typography aria-label="event id">
                              {filteredParticipant.eventId}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography aria-label="event id">
                              {filteredParticipant.eventName}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography aria-label="event description">
                              {filteredParticipant.eventDescription}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
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
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={1}>
                  <Button
                    onClick={() => handleClick(participant.participantId, true)}
                  >
                    Participant's events
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
