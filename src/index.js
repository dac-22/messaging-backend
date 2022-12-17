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

app.listen(3000);
