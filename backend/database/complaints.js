const { connection } = require('./connection');
// const a= require('./createTables')
const createComplaintsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS complaints (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      complainent VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      assignedTo VARCHAR(255) NOT NULL,
      description VARCHAR(255) ,
      remarks VARCHAR(255) ,
      status VARCHAR(255)
    )`;

  try {
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error creating orders table:', err);
        return;
      }
      console.log('Complaints table created successfully!');
    });
  } catch (error) {
    console.error('Error creating orders table:', error);
  }
};

// createComplaintsTable()
// dataAccess.js

const get = (query, params) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const createComplaint = async (complaintData) => {
  const {
    id,
    complainent,
    title,
    assignedTo,
   
    description,
    remarks,
    status,
  } = complaintData;

  const sql = `
    INSERT INTO complaints
    (id, complainent, title, assignedTo,  description, remarks, status)
    VALUES (?, ?, ?, ?, ?, ?,  ?)
  `;

  try {
    const result = await get(sql, [
      id,
      complainent,
      title,
      assignedTo,
      
      description,
      remarks,
      status,
    ]);
    console.log('Complaint created successfully!', result);
    return result;
  } catch (err) {
    console.error('Error creating complaint:', err);
    throw err;
  }
};

const getComplaints = async (username) => {
  const sql = `
    SELECT * FROM complaints where complainent = ?
  `;

  try {
    const result = await get(sql, [username]);
    console.log('Complaints fetched successfully!', result);
    return result;
  } catch (err) {
    console.error('Error fetching complaints:', err);
    throw err;
  }
};


const getComplaintsAdmin = async (username) => {
  const sql = `
    SELECT * FROM complaints where assignedTo = ?
  `;

  try {
    const result = await get(sql, [username]);
    console.log('Complaints fetched successfully!', result);
    return result;
  } catch (err) {
    console.error('Error fetching complaints:', err);
    throw err;
  }
};

const updateComplaint = async (complaintId, updatedData) => {
  const {
    complainent,
    title,
    assignedTo,
    
    description,
    remarks,
    status,
  } = updatedData;

  const sql = `
    UPDATE complaints
    SET
      complainent = ?,
      title = ?,
      
      assignedTo = ?,
      description = ?,
      remarks = ?,
      status = ?
    WHERE id = ?
  `;

  try {
    const result = await get(sql, [
      complainent,
      title,
      assignedTo,
      
      description,
      remarks,
      status,
      complaintId,
    ]);
    console.log('Complaint updated successfully!', result);
    return result;
  } catch (err) {
    console.error('Error updating complaint:', err);
    throw err;
  }
};

const deleteComplaint = async (complaintId) => {
  const sql = `
    DELETE FROM complaints
    WHERE id = ?
  `;

  try {
    const result = await get(sql, [complaintId]);
    console.log('Complaint deleted successfully!', result);
    return result;
  } catch (err) {
    console.error('Error deleting complaint:', err);
    throw err;
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
  createComplaintsTable,
  getComplaintsAdmin
};

