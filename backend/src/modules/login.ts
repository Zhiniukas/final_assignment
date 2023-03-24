import Joi from "joi";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { MYSQL_CONFIG } from "../../config";
import { jwtSecret } from "../../config";

const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

export const userLogin = async (req, res) => {
  let userData = { email: req.body.email, password: req.body.password };

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ error: "Incorrect login data" }).end();
  }

  const issuedAt = new Date().getTime();

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [data] = await con.execute(
      `SELECT * FROM users WHERE email = ${mysql.escape(userData.email)}`
    );

    await con.end();

    if (Array.isArray(data) && data.length === 0) {
      return res
        .status(400)
        .send({ error: "Incorrect email or password" })
        .end();
    }

    const isAuthed = bcrypt.compareSync(userData.password, data[0].password);

    if (isAuthed) {
      const token = jwt.sign(
        {
          id: data[0].id,
          email: data[0].email,
        },
        jwtSecret,
        { algorithm: "HS256" }
      );

      return res
        .send({
          //message: "Succesfully logged in",
          accessToken: token,
          issuedAt: issuedAt,
          email: data[0].email,
          userId: data[0].user_id,
          firstName: data[0].first_name,
          lastName: data[0].last_name,
          roles: [
            { role: "ROLE_MODERATOR", index: 1 },
            { role: "admin", index: 2 },
          ],
        })
        .end();
    }

    return res.status(400).send({ error: "Incorrect email or password" }).end();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Unexpected error" });
  }
};
