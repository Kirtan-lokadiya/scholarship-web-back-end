const express = require("express");
const cors = require('cors');

const connectDB = require("./db/connect");
const bodyParser = require("body-parser");
const scholarroute = require("./routes/addscholarshiproute");
const admin_signup = require("./routes/admin_signup");
const admin_login = require("./routes/admin_login");
const view_scholarship = require("./routes/view_scholarship");
const approval = require("./routes/approval");
const app = express();
app.use(cors());

require('dotenv').config();

app.use(bodyParser.json());

connectDB();

app.use("/", scholarroute);
app.use("/admin", admin_signup);
app.use("/admin", admin_login);
app.use("/", view_scholarship);
app.use("/", approval);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port} at http://localhost:${port}`));