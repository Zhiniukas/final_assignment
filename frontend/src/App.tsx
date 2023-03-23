import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { MainRouter } from "./components/MainRouter/MainRouter";
import { TEvents } from "./types/TEvents";
import { TParticipants } from "./types/TParticipants";

export const App = () => {
  const [events, setEvents] = useState<TEvents[]>([]);
  const [participants, setParticipants] = useState<TParticipants[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const GetEvents = () => {
    axios
      .get("http://localhost:5001/events")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    GetEvents();
  }, []);

  return (
    <div className="App">
      {isLoading ? <h1>Loading...</h1> : <MainRouter />}
    </div>
  );
};
