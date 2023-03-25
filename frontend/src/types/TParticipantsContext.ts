import { TParticipants } from "./TParticipants";

export type TParticipantsContext = {
  participants: TParticipants[];
  setParticipants: React.Dispatch<React.SetStateAction<TParticipants[]>>;
};
