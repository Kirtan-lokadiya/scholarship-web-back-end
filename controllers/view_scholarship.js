// view_scholarship.js

const Scholarship = require("../models/addnewscholarships");

const view_scholarship = async (req, res) => {
    try {
        // Extract filters and search query from query parameters
        const { category, state, currentClass, type, organizationType, searchQuery } = req.query;
        
        // Build a filter object based on the provided parameters
        const filter = {};
        if (category) filter.category = category;
        if (state) filter.state = state;
        if (currentClass) filter.currentClass = currentClass;
        if (type) filter.type = type;
        if (organizationType) filter.organizationType = organizationType;
        if (searchQuery) {
            filter.scholarship_name = { $regex: new RegExp(searchQuery, 'i') };
        }

        // Use the filter object in the MongoDB query
        const scholarships = await Scholarship.find(filter);
        res.json(scholarships);
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = view_scholarship;
