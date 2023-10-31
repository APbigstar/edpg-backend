const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const serverless = require("serverless-http");

// Rate Limiter
const rateLimiter = require("./src/middleware/AuthMiddleware");

const authRoutes = require("./src/routes/authRoutes.js");
const clientRoutes = require("./src/routes/client.js");
const generalRoutes = require("./src/routes/general.js");
const managementRoutes = require("./src/routes/management.js");
const salesRoutes = require("./src/routes/sales.js");

require("dotenv").config({ path: ".env" });

const app = express();
app.use(express.json());
// app.use(rateLimiter);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((error) => console.log(`${error} did not connect.`));

app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/general", generalRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/sales", salesRoutes);

export const handler = serverless(app);
