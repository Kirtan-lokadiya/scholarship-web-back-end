const express = require("express");
const router = express.Router();
const viewscholar = require("../controllers/view_scholarship");

router.get("/allscholarship", viewscholar);
module.exports = router;
