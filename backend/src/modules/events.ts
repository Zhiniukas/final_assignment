import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../../config";

export const getEvents = async (_, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `SELECT events.event_id AS "id", events.event_name AS "title", events.event_description  AS "description", events.event_date  AS "date", events.event_place  AS "place"
      FROM events
      WHERE archived=0;
      `
    );
    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

export const getEventParticipants = async (req, res) => {
  const eventId = +req.params.event_id;

  if (eventId < 0 || typeof eventId !== "number" || Number.isNaN(eventId)) {
    res.status(400).send({ error: "Please provide correct event ID!" }).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `SELECT * 
      FROM event_participants
      WHERE event_participants.is_archived=0;`
    );
    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

export const postEvent = async (req, res) => {
  let eventData = req.body;

  const cleanName = mysql.escape(eventData.eventName).replaceAll("'", "");
  const cleanDescription = mysql
    .escape(eventData.eventDescription)
    .replaceAll("'", "");
  const cleanDate = mysql.escape(eventData.eventDate).replaceAll("'", "");
  const cleanPlace = mysql.escape(eventData.eventPlace).replaceAll("'", "");

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const result = await con.execute(
      `INSERT INTO participants (event_name, event_description, event_date, event_place) VALUES('${cleanName}', '${cleanDescription}', '${cleanDate}','${cleanPlace}');`
    );
    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};
