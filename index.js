const express = require("express");

const PORT = process.env.PORT;
const app = express();
require("dotenv").config();
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
