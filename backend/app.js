require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/aroundb");
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");
const hasError = require("./middleware/hasError");
const { allowedOrigins } = require("./utils/const");

const app = express();

const { PORT = 3000 } = process.env;

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

const usersRoutes = require("./routes/users");

const cardsRoutes = require("./routes/cards");

app.use(usersRoutes);

app.use(cardsRoutes);

app.all("*", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.use(errorLogger);

app.use(errors());

app.use(hasError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
