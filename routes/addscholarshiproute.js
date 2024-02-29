const express = require("express");
const router = express.Router();
const addscholar = require("../controllers/add_scholarship");

router.post("/addscholar", addscholar)
module.exports = router;