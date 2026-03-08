const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;

const categoryRoute = require("./routes/category.route");
const authorRoute = require("./routes/author.route");
const publisherRoute = require("./routes/publisher.route");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/main/category", categoryRoute);
app.use("/main/author", authorRoute);
app.use("/main/publisher", publisherRoute);

app.listen(port, () => {
  console.log(`App Listing on Port ${port}`);
});

const connectionString = process.env.CONNECT_STRING;
mongoose
  .connect(connectionString)
  .then(() => console.log("Connect to MongoDB success!"))
  .catch((err) => console.log(err));
