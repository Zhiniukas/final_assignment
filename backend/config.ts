import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.port || 5000;

export const MYSQL_CONFIG = {
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: process.env.dbSchema,
  port: +process.env.dbPort,
};

export const jwtSecret = process.env.jwtSecret;
export const jwtExpires = process.env.jwtExpires;
