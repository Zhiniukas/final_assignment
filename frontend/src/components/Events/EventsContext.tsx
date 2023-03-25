import { createContext } from "react";
import type { TEventsContext } from "../../types";

export const EventsContext = createContext<TEventsContext>({
  events: [],
  setEvents: () => {},
});
