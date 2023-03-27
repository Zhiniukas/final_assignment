import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ParticipantsContext } from "../../context/ParticipantsContext";
import {
  ParticipantsContainer,
  ParticipantContainer,
  TransparentButton,
} from "../../styles";

export const Participants = () => {
  const [isParticipantSelected, setIsParticipantSelected] =
    useState<boolean>(false);
  const [participantNumber, setParticipantNumber] = useState<number>(0);

  const { participants } = useContext(ParticipantsContext);

  const handleClick = (participantId: number, showList: boolean) => {
    setParticipantNumber(participantId);
    setIsParticipantSelected(showList);
  };

  // let temp ;

  // participants.map(participant) => (
  //  temp = [...temp,  participant])

  // let cleanParticipants = temp.reduce((accumulator:TParticipants, value) => {
  //   if (!accumulator.includes(currentValue)) {
  //     accumulator([...accumulator, currentValue]);
  //   }
  //   return accumulator;
  // }, []);

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
          <p>Participant Event Id: {participant.eventId}</p>
        </ParticipantContainer>
      ))}
    </ParticipantsContainer>
  );
};
