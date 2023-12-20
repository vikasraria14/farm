
const adminRouter=require('express').Router();

const {
    createComplaint,
    getComplaints,
    getComplaintsAdmin,
    updateComplaint,
    deleteComplaint,
  } = require('../database/complaints');
  
  
  adminRouter.post('/', async (req, res) => {
    try {
      // Assuming you receive complaint data in the request body
      const {
        id,
        complainent,
        title,
        assignedTo,
        assignedToUsername,
        description,
        remarks,
        status='new',
      } = req.body;
      
      // Create a new complaint
      await createComplaint({
        id,
        complainent,
        title,
        assignedTo,
        assignedToUsername,
        description,
        remarks,
        status,
      });
  
      // Optionally, you can fetch the updated list of complaints after creation
      const updatedComplaints = await getComplaints();
  
      // Respond with the updated list of complaints or any other relevant data
      res.status(201).json({
        message: 'Complaint created successfully!',
        complaints: updatedComplaints,
      });
    } catch (error) {
      console.error('Error creating complaint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // GET all complaints
adminRouter.get('/', async (req, res) => {
    try {
      const username = req.query.username
      const complaints = await getComplaints(username);
      res.status(200).json(complaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  adminRouter.get('/admin', async (req, res) => {
    try {
      const username = req.query.username
      const complaints = await getComplaintsAdmin(username);
      res.status(200).json(complaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // UPDATE a complaint by ID
  adminRouter.put('/:id', async (req, res) => {
    try {
      const complaintId = req.params.id;
      const updatedData = req.body;
  
      // Update the complaint
      await updateComplaint(complaintId, updatedData);
  
      // Optionally, you can fetch the updated list of complaints after the update
      const updatedComplaints = await getComplaints();
  
      // Respond with the updated list of complaints or any other relevant data
      res.status(200).json({
        message: 'Complaint updated successfully!',
        complaints: updatedComplaints,
      });
    } catch (error) {
      console.error('Error updating complaint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // DELETE a complaint by ID
  adminRouter.delete('/:id', async (req, res) => {
    try {
      const complaintId = req.params.id;
  
      // Delete the complaint
      await deleteComplaint(complaintId);
  
      // Optionally, you can fetch the updated list of complaints after the deletion
      const updatedComplaints = await getComplaints();
  
      // Respond with the updated list of complaints or any other relevant data
      res.status(200).json({
        message: 'Complaint deleted successfully!',
        complaints: updatedComplaints,
      });
    } catch (error) {
      console.error('Error deleting complaint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = adminRouter;