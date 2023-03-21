import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config";

export const isUserLoggedIn = (req, res, next) => {
  const body = req.body;
  const accessToken = req.headers.authorization;

  let payload = null;

  if (!accessToken) {
    return res.status(401).send({ error: "User unauthorised" }).end();
  }

  try {
    payload = jwt.verify(accessToken.replace("Bearer ", ""), jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }
    return res.status(400).end();
  }

  return next();
};
