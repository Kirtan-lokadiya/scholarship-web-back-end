const express = require("express");
require('dotenv').config();


const connectDB = require("./db/connect");


const app = express();
const port = process.env.PORT || 8080;

// Connect to the database
connectDB();



// Start the express server
app.listen(port, () => console.log(`Server running on port ${port} at http://localhost:${port}`));