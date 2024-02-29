const express = require("express");
const router = express.Router();
const approval = require("../controllers/approval");

router.put("/approval/:id", approval)
module.exports = router;