const express = require('express');
require('dotenv').config();

const PORT = process.env.DB_PORT;
const app = express();
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(8080, () => {
  console.log(`Express app listening on port 8080!`);
});
