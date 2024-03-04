const express = require("express");
const router = express.Router();
const viewsignup = require("../controllers/view_signup");

router.get("/allsignup", viewsignup)
module.exports = router;