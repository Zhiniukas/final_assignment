import { TEvents } from "./TEvents";

export type TEventsContext = {
  events: TEvents[];
  setEvents: React.Dispatch<React.SetStateAction<TEvents[]>>;
};
