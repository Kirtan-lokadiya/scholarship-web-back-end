const Admin = require("../models/admin_signup");

const approval = async (req, res) => {
    const adminId  = req.params.id;
    const { approvalStatus } = req.body;
  
    try {
      // Find the admin by ID
      const admin = await Admin.findById(adminId);
  
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Update approval status
      admin.approvalStatus = approvalStatus;
  
      // Save the updated admin to the database
      await admin.save();
  
      res.json({ message: "Approval status updated successfully", admin });
    } catch (error) {
      console.error("Error updating approval status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = approval;
