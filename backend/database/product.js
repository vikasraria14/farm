const { connection } = require('./connection');

const createMenuTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS product (
      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      label VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      cost INT NOT NULL,
      quantity INT NOT NULL,
      rating INT NOT NULL,
      image VARCHAR(255) NOT NULL,
      addedBy VARCHAR(255) NOT NULL
    )
  `;

  try {
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error creating table:', err);
        return;
      }
      console.log('Product Table created successfully!');
    });
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

const insertMenu = (menuData) => {
  const sql = `
    INSERT INTO product (name, category, cost, rating, image, quantity, addedBy)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    menuData.name,
    menuData.category,
    menuData.cost,
    menuData.rating,
    menuData.image,
    menuData.quantity,
    menuData.addedBy
  ];

  try {
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting product:', err);
        return;
      }
      console.log(`Food ${menuData.name} inserted successfully!`);
    });
  } catch (error) {
    console.error('Error inserting product:', error);
  }
};

const getMenuById = (menuId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM product WHERE id = ?';

    try {
      connection.query(sql, [menuId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllMenus = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM product`;

    try {
      connection.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getMenusByCategory = (category) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM product where category = ?`;

    try {
      connection.query(sql, category, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getMenusBySeller = (sellerId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM product where addedBy = ?`;

    try {
      connection.query(sql, sellerId, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

function updateMenuCostById(id, newCost, newQuantity) {
  const sql = `UPDATE product SET cost = ${newCost} , quantity = ${newQuantity} WHERE id = ${id}`;

  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        throw error;
      }
      console.log(`Updated cost for product with ID ${id}`);
    });
  } catch (error) {
    console.error('Error updating product cost:', error);
  }
}

function decreaseMenuQuantity(id, decreaseBy) {
  const sql = `UPDATE product SET quantity = quantity - ${decreaseBy} WHERE id = ${id}`;

  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        throw error;
      }
      console.log(`Updated Quantity for product with ID ${id}`);
    });
  } catch (error) {
    console.error('Error updating product quantity', error);
  }
}

function updateCategoryTable(table_name, name, newCost) {
  const sql = `UPDATE ${table_name} SET cost = ${newCost} WHERE name = '${name}'`;

  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        throw error;
      }
      console.log(`Updated cost for ${table_name} with name ${name}`);
    });
  } catch (error) {
    console.error('Error updating category cost:', error);
  }
}





module.exports = {
  insertMenu,
  createMenuTable,
  getAllMenus,
  getMenuById,
  getMenusByCategory,
  updateMenuCostById,
  updateCategoryTable,
  decreaseMenuQuantity,
  getMenusBySeller
  
};
