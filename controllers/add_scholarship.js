const Scholarship = require("../models/addnewscholarships");

const  add_scholarship= async (req, res)=> {
    try {
      const newScholarship = new Scholarship(req.body);
      const savedScholarship = await newScholarship.save();
      res.status(201).json(savedScholarship);
    } catch (error) {
      console.error("Error creating scholarship:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


module.exports = add_scholarship;
