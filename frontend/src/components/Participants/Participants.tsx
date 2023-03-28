import { useContext, useState } from "react";
import { EventParticipantsContext } from "../../context/EventsParticipantsContext";
import { ParticipantsContext } from "../../context/ParticipantsContext";
import {
  ParticipantsContainer,
  ParticipantContainer,
  TransparentButton,
  EventsParticipantsContainer,
} from "../../styles";

export const Participants = () => {
  const [isParticipantSelected, setIsParticipantSelected] =
    useState<boolean>(false);
  const [participantNumber, setParticipantNumber] = useState<number>(0);

  const { participants } = useContext(ParticipantsContext);
  const { eventsParticipants } = useContext(EventParticipantsContext);

  const handleClick = (participantId: number, showList: boolean) => {
    setParticipantNumber(participantId);
    setIsParticipantSelected(showList);
  };

  const handleDeleteParticipantClick = (
    participantIndex: number | null,
    eventIndex: number | null
  ) => {};

  return (
    <ParticipantsContainer>
      {participants.map((participant, i) => (
        <ParticipantContainer key={participant.participantId}>
          <p>Participant Id: {participant.participantId}</p>
          <p>First name: {participant.firstName}</p>
          <p>Last name: {participant.lastName}</p>
          <p>Email: {participant.email}</p>
          <p>Date of Birth: {participant.birthDate}</p>
          <p>Participant Age: {participant.age}</p>

          {participant.participantId === participantNumber &&
          isParticipantSelected ? (
            <>
              <TransparentButton
                onClick={() => handleClick(participant.participantId, false)}
              >
                Hide Events list
              </TransparentButton>

              {eventsParticipants
                .filter(
                  (participant) =>
                    participant.participantId === participantNumber
                )
                .map((filteredParticipant, j) => (
                  <EventsParticipantsContainer
                    key={filteredParticipant.eventId + " " + j}
                  >
                    <>
                      <p>Event Id: {filteredParticipant.eventId}</p>
                      <p>Event Title: {filteredParticipant.eventName}</p>
                      <p>
                        Event Description:{" "}
                        {filteredParticipant.eventDescription}
                      </p>
                      <p>Event Date: {filteredParticipant.eventDate}</p>
                      <p>Event Place: {filteredParticipant.eventPlace}</p>
                      <TransparentButton
                        onClick={() =>
                          handleDeleteParticipantClick(
                            participant.eventId,
                            participantNumber
                          )
                        }
                      >
                        Delete Event
                      </TransparentButton>
                    </>
                  </EventsParticipantsContainer>
                ))}
            </>
          ) : (
            <>
              <TransparentButton
                onClick={() => handleClick(participant.participantId, true)}
              >
                Participant's events
              </TransparentButton>
            </>
          )}
        </ParticipantContainer>
      ))}
    </ParticipantsContainer>
  );
};
