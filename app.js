const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/dist")));

//routes
const apiCall = require("./routes/api");
app.use("/", apiCall);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

const port = 8080;
app.listen(port, () => console.log(`Node-app is listening on port ${port}`));
