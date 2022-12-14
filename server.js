const mongoose = require("mongoose");
const routes = require("./routes");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-outline",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.use(routes);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
