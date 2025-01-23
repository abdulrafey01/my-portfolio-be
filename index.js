const express = require("express");
const connectToDb = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const { uploadFile } = require("./services/backblaze.service");
const morgan = require("morgan");

const app = express();

dotenv.config();
connectToDb();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/projects", require("./routes/project.routes"));

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
