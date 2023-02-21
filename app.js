const express = require("express");
const sequelize = require("./utils/database");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./routes/auth");

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(bodyParser.json());

app.use("/auth", auth);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
sequelize
  .sync()
  .then((res) => {
    app.listen(8080);
  })
  .catch();
