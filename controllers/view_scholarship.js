const Scholarship = require("../models/addnewscholarships");

const add_scholarship = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = add_scholarship;
