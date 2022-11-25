
import express from "express";
const app = express();

import db from "./startup/db.js";
import "./startup/logging.js"
import routes from "./startup/routes.js";

routes(app);
db();

const port = process.env.PORT || 3005;
app.listen(port,() =>console.log(`Listening on ${port}`));