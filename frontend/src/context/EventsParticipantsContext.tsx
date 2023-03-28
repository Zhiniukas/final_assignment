import { createContext } from "react";
import type { TEventsParticipantsContext } from "../types";

export const EventParticipantsContext =
  createContext<TEventsParticipantsContext>({
    eventsParticipants: [],
    setEventsParticipants: () => {},
  });
