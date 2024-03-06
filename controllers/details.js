const Scholarship = require("../models/addnewscholarships");

const details = async (req, res) => {
  try {
    // Extract scholarship ID from params
    const { id } = req.params;
    console.log(id)
    if (!id) {
      return res.status(400).json({ error: 'Scholarship ID is required' });
    }

    // Fetch the scholarship by ID
    const scholarship = await Scholarship.findById( id );
    console.log(scholarship)
    
    // Check if the scholarship was found
    if (scholarship.length === 0) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    // Return the scholarship document
    res.json(scholarship);
  } catch (error) {
    console.error('Error fetching scholarship:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = details;
