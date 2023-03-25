import { useState, useEffect } from "react";
import axios from "axios";

//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { MainRouter } from "./components/MainRouter";
import { TEvents, TParticipants } from "./types";
import { EventsContext } from "./components/Events/EventsContext";
import { ParticipantsContext } from "./components/Participants/ParticipantsContext";

const App = () => {
  const [events, setEvents] = useState<TEvents[]>([]);
  const [participants, setParticipants] = useState<TParticipants[]>([]);

  const GetEvents = () => {
    axios
      .get("http://localhost:5001/events")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    GetEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      <ParticipantsContext.Provider value={{ participants, setParticipants }}>
        <MainRouter />
      </ParticipantsContext.Provider>
    </EventsContext.Provider>
  );
};

export default App;
