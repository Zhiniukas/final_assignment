import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../../config";

export const getEvents = async (_, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `SELECT events.event_id AS "id", events.event_name AS "name", events.event_description  AS "description", events.event_date  AS "date", events.event_place  AS "place", events.archived  AS "isArchived"
      FROM events;
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
      `SELECT participants.participant_id AS "participantId", participants.first_name AS "firstName", participants.last_name AS "lastName", participants.email AS "email", participants.date_of_birth AS "birthDate", participants.age AS "age", events.event_name AS "eventName", events.event_description AS "eventDescription", events.event_date AS "eventDate", events.event_place AS "eventPlace", events.event_id AS "eventId"
      FROM (events INNER JOIN event_participants ON events.event_id = event_participants.event_id) INNER JOIN participants ON event_participants.participant_id = participants.participant_id
      WHERE (((events.event_id)=('${eventtId}')) AND ((participants.archived)=0) AND ((events.archived)=0))
      ORDER BY events.event_date;`
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
