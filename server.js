require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
let cors = require("cors");
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const todoRouter = require("./routes/todos");
app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Hellow World");
});
// todo: find out why process.env.PORT isn't working here
app.listen(3000, () => console.log("Server started"));
