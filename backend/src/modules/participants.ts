import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../../config";

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
