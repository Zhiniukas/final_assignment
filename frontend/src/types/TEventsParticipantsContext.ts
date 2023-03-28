import { TEventsParticipants } from "./TEventsParticipants";

export type TEventsParticipantsContext = {
  eventsParticipants: TEventsParticipants[];
  setEventsParticipants: React.Dispatch<
    React.SetStateAction<TEventsParticipants[]>
  >;
};
