const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const colors = require("colors");

const {connectDB} = require("./config/db");

connectDB();
const {errorHandler} = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is started at", port);
});
