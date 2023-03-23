import { config } from "dotenv";
config();

import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

import { userLogin } from "./src/modules/login";
import { userRegister } from "./src/modules/register";
import { isUserLoggedIn } from "./src/utils/isLoggedIn";

import { getParticipants } from "./src/modules/participants";
import { getAllParticipants } from "./src/modules/participants";
import { getParticipantEvents } from "./src/modules/participants";
import { postParticipant } from "./src/modules/participants";

import { getEvents } from "./src/modules/events";
import { getEventParticipants } from "./src/modules/events";
import { postEvent } from "./src/modules/events";

import { PORT } from "./config";

const app = express();

app.use(cors(), express.json(), cookieParser());

app.post("/login", userLogin);
app.post("/register", userRegister);

app.get("/participants", getParticipants);
app.get("/all-participants", getAllParticipants);
app.get("/participants/:participant_id", getParticipantEvents);
app.post("/participants", postParticipant);

//app.get("/events", isUserLoggedIn, getEvents);

app.get("/events", getEvents);
app.get("/events/:event_id", getEventParticipants);
app.post("/events", postEvent);

// app.get("/participants", isUserLoggedIn, getParticipants);
// app.get("/participants", isUserLoggedIn, getAllParticipants);
// app.get("/participants/:participant_id", isUserLoggedIn, getParticipantEvents);
// app.post("/participants", isUserLoggedIn, postParticipant);

// //app.get("/events", isUserLoggedIn, getEvents);

// app.get("/events", getEvents);
// app.get("/events/:event_id", isUserLoggedIn, getEventParticipants);
// app.post("/events", isUserLoggedIn, postEvent);

app.get("/", (_, res) => {
  res.send({ msg: "Server is running" });
});

app.all("*", (_, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
