import { useContext, useState } from "react";
import { useLocation } from "react-router";
import { ParticipantsContext } from "../../context/ParticipantsContext";
import { EventsContext } from "../../context/EventsContext";
import {
  EventsContainer,
  EventContainer,
  TransparentButton,
} from "../../styles";

export const Events = () => {
  const location = useLocation();
  const [isEventSelected, setIsEventSelected] = useState<boolean>(false);
  const [eventNumber, setEventNumber] = useState<number>(0);

  const { events } = useContext(EventsContext);
  const { participants } = useContext(ParticipantsContext);

  const handleClick = (eventIndex: number, showList: boolean) => {
    setEventNumber(eventIndex);
    setIsEventSelected(showList);
  };

  const handleDeleteParticipantClick = (
    participantIndex: number | null,
    eventIndex: number | null
  ) => {};

  return (
    <EventsContainer key={location.key}>
      {events.map((event, i) => (
        <EventContainer key={event.id}>
          <p>Event Id: {event.id}</p>
          <p>Event Title: {event.title}</p>
          <p>Event Description: {event.description}</p>
          <p>Event Date: {event.date}</p>
          <p>Event Place: {event.place}</p>
          {event.id === eventNumber && isEventSelected ? (
            <>
              <TransparentButton onClick={() => handleClick(event.id, false)}>
                Hide Participants list
              </TransparentButton>

              {participants
                .filter((participant) => participant.eventId === eventNumber)
                .map((filteredParticipant, j) => (
                  <>
                    <p>Participant Id: {filteredParticipant.participantId}</p>
                    <p>First name: {filteredParticipant.firstName}</p>
                    <p>Last name: {filteredParticipant.lastName}</p>
                    <p>Email: {filteredParticipant.email}</p>
                    <p>Date of Birth: {filteredParticipant.birthDate}</p>
                    <p>Participant Age: {filteredParticipant.age}</p>
                    <p>Participant Event Id: {filteredParticipant.eventId}</p>
                    <TransparentButton
                      onClick={() =>
                        handleDeleteParticipantClick(
                          filteredParticipant.participantId,
                          eventNumber
                        )
                      }
                    >
                      Remove participant
                    </TransparentButton>
                  </>
                ))}
            </>
          ) : (
            <>
              <TransparentButton onClick={() => handleClick(event.id, true)}>
                Participants list
              </TransparentButton>
            </>
          )}
        </EventContainer>
      ))}
    </EventsContainer>
  );
};
