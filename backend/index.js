const express = require("express");
const cors = require("cors");

const dbConnect = require("./config/dbConnect");

const authRoutes = require("./routes/auth.route");
const symptomRoutes = require("./routes/symptom.route");
const diseaseRoutes = require("./routes/disease.route");
const messageRoutes = require("./routes/message.route");
const hospitalRoutes =  require("./routes/hospital.route");
const clinicRoutes = require("./routes/clinic.route");
const doctorRoutes = require("./routes/doctor.route");
const chatMessageRoutes = require("./routes/chatMessage.route");
const userRoutes = require("./routes/user.route");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/symptoms", symptomRoutes);
app.use("/api/v1/diseases", diseaseRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/hospital", hospitalRoutes);
app.use("/api/v1/clinic", clinicRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/chatMessage",chatMessageRoutes);

dbConnect();

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
