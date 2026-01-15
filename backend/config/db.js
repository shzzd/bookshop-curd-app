// const mysql = require("mysql2");
import mysql from "mysql2";
// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB
});

const connectionCheck = async () => {
  try {
    await db.promise().query("SELECT 1");
    console.log("Database connection is successfull.");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

connectionCheck();
export default db;