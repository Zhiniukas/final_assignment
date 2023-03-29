import { useState } from "react";
import { TEventsParticipants } from "../types";
import { ParticipantRemove } from "./participantRemove";

const RemoveRecord = (pId: number | null, eId: number | null) => {
  const [eventsParticipants, setEventsParticipants] =
    useState<TEventsParticipants>([]);
  const updatedList = eventsParticipants.filter(
    (record) => record.eventId !== eId || record.participantId !== pId
  );
  setEventsParticipants(updatedList);
};

export const handleDeleteParticipantClick = (
  participantIndex: number | null,
  eventIndex: number | null
) => {
  ParticipantRemove(participantIndex, eventIndex);
  RemoveRecord(participantIndex, eventIndex);
};
