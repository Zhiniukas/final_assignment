import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../../config";
import { jwtSecret } from "../../config";

const schema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  birthDate = Joi.date(),
  eventId = Joi.number(),
});

export const getParticipants = async (_, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `SELECT participants.participant_id AS "participantId", participants.first_name AS "firstName", participants.last_name AS "lastName", participants.email AS "email", participants.date_of_birth AS "birthDate", participants.age AS "age", events.event_name AS "eventName", events.event_description AS "eventDescription", events.event_date AS "eventDate", events.event_place AS "eventPlace", events.event_id AS "eventId"
      FROM (events INNER JOIN event_participants ON events.event_id = event_participants.event_id) INNER JOIN participants ON event_participants.participant_id = participants.participant_id
      WHERE (((participants.archived)=0) AND ((events.archived)=0))
      ORDER BY events.event_date;`
    );
    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

export const getAllParticipants = async (_, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `SELECT participant_id AS "participantId", first_name AS "firstName", last_name AS "lastName", email AS "email", date_of_birth AS "birthDate", age AS "age"
      FROM participants 
      ORDER BY last_name;`
    );
    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

export const getParticipantEvents = async (req, res) => {
  const participantId = +req.params.participant_id;

  if (
    participantId < 0 ||
    typeof participantId !== "number" ||
    Number.isNaN(participantId)
  ) {
    res
      .status(400)
      .send({ error: "Please provide correct participant ID!" })
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `SELECT participants.participant_id AS "participantId", participants.first_name AS "firstName", participants.last_name AS "lastName", participants.email AS "email", participants.date_of_birth AS "birthDate", participants.age AS "age", events.event_name AS "eventName", events.event_description AS "eventDescription", events.event_date AS "eventDate", events.event_place AS "eventPlace", events.event_id AS "eventId"
      FROM (events INNER JOIN event_participants ON events.event_id = event_participants.event_id) INNER JOIN participants ON event_participants.participant_id = participants.participant_id
      WHERE (((participants.participant_id)=('${participantId}')) AND ((participants.archived)=0) AND ((events.archived)=0))
      ORDER BY events.event_date;`
    );
    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

export const postParticipant = async (req, res) => {
  let participantData = req.body;

  try {
    participantData = await schema.validateAsync(participantData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  const cleanfirstName = mysql
    .escape(participantData.firstName)
    .replaceAll("'", "");
  const cleanlastName = mysql
    .escape(participantData.lastName)
    .replaceAll("'", "");
  const cleanemail = mysql.escape(participantData.email).replaceAll("'", "");
  const cleanbirthDate = mysql
    .escape(participantData.birthDate)
    .replaceAll("'", "");
  const cleaneventId = mysql
    .escape(participantData.eventId)
    .replaceAll("'", "");
  const age = new Date.getFullYear() - participantData.birthDate.getFullYear();

  if (
    participantData.eventId < 0 ||
    Number.isNaN(participantData.eventId) ||
    typeof participantData.eventId !== "number"
  ) {
    return res
      .status(400)
      .send(`Incorrect group ID provided: ${participantData.eventId}`)
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const result = await con.execute(
      `INSERT INTO participants (first_name, last_name, email, date_of_birth, age) VALUES('${cleanfirstName}', '${cleanlastName}', '${cleanemail}','${cleanbirthDate}', '${age}');``SELECT participant_id
      FROM participants
      WHERE (email='${cleanemail}');`
    );
    await con.end();
    const result2 = await con.execute(
      `INSERT INTO event_participants (participant_id, event_id) VALUES ('${result.participant_id}', '${cleaneventId}')`
    );
    await con.end();

    res.send(result[0], result2[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};
