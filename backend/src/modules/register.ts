import Joi from "joi";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

import { MYSQL_CONFIG } from "../../config";

const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
});

export const userRegister = async (req, res) => {
  let userData = req.body;

  console.log(userData);

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  const hashedPassword = bcrypt.hashSync(userData.password);
  const cleanFirstName = mysql.escape(userData.firstName).replaceAll("'", "");
  const cleanLastName = mysql.escape(userData.lastName).replaceAll("'", "");

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `INSERT INTO users ( email, password, first_name, last_name) VALUES( '${userData.email}', '${hashedPassword}', '${cleanFirstName}', '${cleanLastName}')`
    );

    await con.end();

    res.send(result[0]).end();
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};
