import { useEffect, useContext } from "react";
import axios from "axios";
import { ParticipantsContext } from "../Participants/ParticipantsContext";
import { EventsContext } from "../Events/EventsContext";
import { ParticipantsContainer } from "../../styles/ParticipantsContainer";
import { ParticipantContainer } from "../../styles/ParticipantContainer";
import { TransparentButton } from "../../styles/TransparentButton";

export const Participants = () => {
  const { participants, setParticipants } = useContext(ParticipantsContext);
  const { events } = useContext(EventsContext);

  const GetParticipants = () => {
    axios
      .get("http://localhost:5001/participants")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setParticipants(res.data);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    GetParticipants();
  }, []);

  const handleClick = (participantId: number) => {
    const event = participants[participantId];
  };

  return (
    <ParticipantsContainer>
      {participants.map((participant, i) => (
        <ParticipantContainer key={participant.participantId}>
          <p>First name: {participant.participantId}</p>
          <p>First name: {participant.firstName}</p>
          <p>Last name: {participant.lastName}</p>
          <p>Email: {participant.email}</p>
          <p>Date of Birth: {participant.birthDate}</p>
          <p>Participant Age: {participant.age}</p>
          <p>Participant Event Id: {participant.eventId}</p>
          <TransparentButton onClick={() => handleClick(i)}>
            Participants list
          </TransparentButton>
        </ParticipantContainer>
      ))}
    </ParticipantsContainer>
  );
};
