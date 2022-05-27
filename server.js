const express = require("express");
const cors = require("cors");

const port = 8080;
const app = express();

app.use(express.json());
app.use(cors);

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
