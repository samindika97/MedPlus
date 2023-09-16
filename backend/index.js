const express = require("express");
const cors = require("cors");

const dbConnect = require("./config/dbConnect");

const symptomRoutes = require("./routes/symptom.route");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
    allowedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use("/api/v1/symptoms", symptomRoutes);

dbConnect();

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
