const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Rate Limiter
const rateLimiter = require("./src/middleware/AuthMiddleware");

const authRoutes = require("./src/routes/authRoutes.js");
const clientRoutes = require("./src/routes/client.js");
const generalRoutes = require("./src/routes/general.js");
const managementRoutes = require("./src/routes/management.js");
const salesRoutes = require("./src/routes/sales.js");

require("dotenv").config({ path: ".env" });

console.log(process.env.MONGO_URL);

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

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect.`));

app.use("/auth", authRoutes);
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
