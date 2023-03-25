import { createContext } from "react";
import type { TParticipantsContext } from "../../types";

export const ParticipantsContext = createContext<TParticipantsContext>({
  participants: [],
  setParticipants: () => {},
});
