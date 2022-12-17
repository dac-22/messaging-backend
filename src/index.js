import express from "express";
import bluebird from "bluebird";
import { createConnection } from "mysql";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectionUri = {
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "cdac",
};

/* http://localhost:3000/ */
app.get("/", (req, res) => res.send("Hello"));

/* http://localhost:3000/messages */
app.get("/messages", async (req, res) => {
  let list = [];
  let connection = createConnection(connectionUri);
  bluebird.promisifyAll(connection);

  await connection.connectAsync();

  let sql = `SELECT * FROM message`;
  list = await connection.queryAsync(sql);

  await connection.endAsync();

  res.json(list);
});

/* http://localhost:3000/message */
app.post("/message", async (req, res) => {
  let connection = createConnection(connectionUri);
  bluebird.promisifyAll(connection);

  await connection.connectAsync();

  let message = "Hello Mumbai";
  let reply = 0;
  // let sql = `INSERT INTO message (message, reply) VALUES ('${message}', ${reply})`;
  let sql = `INSERT INTO message (message, reply) VALUES (?, ?)`;
  await connection.queryAsync(sql, [message, reply]);

  await connection.endAsync();

  let output = { msg: "Record Created Successfully" };
  res.json(output);
});

app.listen(3000);
