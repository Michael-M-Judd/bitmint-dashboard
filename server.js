const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// routes
const buys = require("./routes/api/buys");
const bot = require("./routes/api/bot");
const price = require("./routes/api/price");
const coinMeta = require("./routes/api/coinMeta");

app.use(function(req, res, next) {
  const allowedOrigins = [
    "http://127.0.0.1",
    "http://localhost:3000",
    "http://localhost:5000",
    "http://144.202.56.250",
    "http://144.202.56.250:3000",
    "http://144.202.56.250:5000"
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    console.log(origin);
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

// Bodyparse Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/buys", buys);
app.use("/api/bot", bot);
app.use("/api/price", price);
app.use("/api/coinMeta", coinMeta);

// Server assets in production
const port = process.env.PORT || 5000;

app.listen(port, () => console.log`Server started on port: ${port}`);
