import { useState, useContext } from "react";
import { ParticipantsContext } from "../Participants/ParticipantsContext";
import { EventsContext } from "./EventsContext";
import { EventsContainer } from "../../styles/EventsContainer";
import { EventContainer } from "../../styles/EventContainer";
import { TransparentButton } from "../../styles/TransparentButton";

export const Events = () => {
  const { events } = useContext(EventsContext);
  const { participants, setParticipants } = useContext(ParticipantsContext);

  const handleClick = (eventIndex: number) => {
    const event = events[eventIndex];
  };

  return (
    <EventsContainer>
      {events.map((event, i) => (
        <EventContainer key={event.id}>
          <p>{event.title}</p>
          <p>{event.description}</p>
          <p>{event.date}</p>
          <p>{event.place}</p>
          <TransparentButton onClick={() => handleClick(i)}>
            Participants list
          </TransparentButton>
        </EventContainer>
      ))}
    </EventsContainer>
  );
};
