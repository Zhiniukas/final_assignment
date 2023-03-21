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
