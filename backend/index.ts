import { config } from "dotenv";
config();

import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

import { userLogin } from "./src/modules/login";
import { userRegister } from "./src/modules/register";
import { isUserLoggedIn } from "./src/utils/isLoggedIn";

import { getParticipants } from "./src/modules/participants";
import { postParticipant } from "./src/modules/participants";
import { removeParticipant } from "./src/modules/participants";

import { getEvents } from "./src/modules/events";
import { getEventParticipants } from "./src/modules/events";
import { postEvent } from "./src/modules/events";

import { PORT } from "./config";

const app = express();

app.use(cors(), express.json(), cookieParser());

app.post("/login", userLogin);
app.post("/register", userRegister);

app.get("/participants", isUserLoggedIn, getParticipants);
app.post("/remove-participant", isUserLoggedIn, removeParticipant);

app.post("/add-participant", isUserLoggedIn, postParticipant);

app.get("/events", isUserLoggedIn, getEvents);
app.get("/event-participants", isUserLoggedIn, getEventParticipants);
app.post("/events", isUserLoggedIn, postEvent);

app.get("/", (_, res) => {
  res.send({ msg: "Server is running" });
});

app.all("*", (_, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
