const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

const routerApi = require("../routes");

app.use(cors());
app.use(express.json());

routerApi(app);

module.exports = app;