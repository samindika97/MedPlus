const express = require("express");
const cors = require("cors");

const dbConnect = require("./config/dbConnect");

const symptomRoutes = require("./routes/symptom.route");
const diseaseRoutes = require("./routes/disease.route");
const messageRoutes = require("./routes/message.route");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/v1/symptoms", symptomRoutes);
app.use("/api/v1/diseases", diseaseRoutes);
app.use("/api/v1/message", messageRoutes);

dbConnect();

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
