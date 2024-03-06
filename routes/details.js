const express = require("express");
const router = express.Router();
const viewscholar = require("../controllers/details");

router.get("/allscholarship/:id", viewscholar)
module.exports = router;