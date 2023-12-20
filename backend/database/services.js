const fs = require('fs');
const { connection } = require('./connection');

const addedBy = ['dealer1', 'dealer2'];
const serviceData = [
  {
    "label": "Fertilizer",
    "name": "fertilizer",
    "category": "agricultural",
    "image": "uploads/fertilizer.jpg",
    "cost": 20.99,
    "quantity": 100,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Tractor",
    "name": "tractor",
    "category": "equipment",
    "image": "uploads/tractor.jpg",
    "cost": 50000.00,
    "quantity": 10,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Seeds - Corn",
    "name": "corn_seeds",
    "category": "seeds",
    "image": "uploads/corn_seeds.jpg",
    "cost": 5.99,
    "quantity": 200,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Crop Sprayer",
    "name": "crop_sprayer",
    "category": "equipment",
    "image": "uploads/crop_sprayer.jpg",
    "cost": 1500.00,
    "quantity": 5,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Organic Fertilizer",
    "name": "organic_fertilizer",
    "category": "agricultural",
    "image": "uploads/organic_fertilizer.jpg",
    "cost": 25.99,
    "quantity": 80,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Harvesting Scythe",
    "name": "harvesting_scythe",
    "category": "equipment",
    "image": "uploads/harvesting_scythe.jpg",
    "cost": 34.50,
    "quantity": 15,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Gardening Shovel",
    "name": "gardening_shovel",
    "category": "gardening",
    "image": "uploads/gardening_shovel.jpg",
    "cost": 8.99,
    "quantity": 50,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Hay Baler",
    "name": "hay_baler",
    "category": "equipment",
    "image": "uploads/hay_baler.jpg",
    "cost": 12000.00,
    "quantity": 3,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Pesticide Sprayer",
    "name": "pesticide_sprayer",
    "category": "equipment",
    "image": "uploads/pesticide_sprayer.jpg",
    "cost": 450.00,
    "quantity": 8,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Hay Rake",
    "name": "hay_rake",
    "category": "equipment",
    "image": "uploads/hay_rake.jpg",
    "cost": 800.00,
    "quantity": 6,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Livestock Feed",
    "name": "livestock_feed",
    "category": "feed",
    "image": "uploads/livestock_feed.jpg",
    "cost": 15.99,
    "quantity": 120,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Drip Irrigation System",
    "name": "drip_irrigation_system",
    "category": "irrigation",
    "image": "uploads/drip_irrigation_system.jpg",
    "cost": 1800.00,
    "quantity": 4,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Vegetable Seeds Variety Pack",
    "name": "vegetable_seeds_pack",
    "category": "seeds",
    "image": "uploads/vegetable_seeds_pack.jpg",
    "cost": 9.99,
    "quantity": 150,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  },
  {
    "label": "Wheelbarrow",
    "name": "wheelbarrow",
    "category": "gardening",
    "image": "uploads/wheelbarrow.jpg",
    "cost": 45.00,
    "quantity": 20,
    "rating": Math.round(Math.random() * 5),
    "addedBy": addedBy[Math.floor(Math.random() * addedBy.length)]
  }
];





const insertProduct = (productData) => {
  try {
    const sql = `
      INSERT INTO product (label, name, category, cost, rating, image, quantity, addedBy)
      VALUES (?, ?, ?, ?, ?, ?,?,?)
    `;

    const values = [
      productData.label,
      productData.name,
      productData.category,
      productData.cost,
      productData.rating,
      productData.image,
      productData.quantity,
      productData.addedBy
    ];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting product:', err);
        return;
      }
      console.log(`Product ${productData.name} inserted successfully!`);
    });
  } catch (error) {
    console.error('Error inserting product:', error);
  }
};

function createNewTableByCategory(table_name, category) {
  try {
    const newTableName = table_name;

    // Create new table query
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${newTableName} (
      id INT NOT NULL AUTO_INCREMENT,
      item_no INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      cost INT NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (item_no) REFERENCES product(id)
    )`;

    connection.query(createTableQuery, (error, results, fields) => {
      if (error) {
        console.log(`Error creating new table: ${error}`);
        return;
      }

      console.log(`New table ${newTableName} created successfully.`);
    });

    let insertQuery = ` INSERT INTO ${newTableName} (name, cost, item_no)
    SELECT name, cost, id FROM product WHERE category = '${category}';`;

    connection.query(insertQuery, (error, results, fields) => {
      if (error) {
        console.log(`Error inserting into the table: ${error}`);
        return;
      }

      console.log(`Inserted into ${newTableName}`);
    });
  } catch (error) {
    console.error('Error creating or inserting into a new table:', error);
  }
}

const populateDatabase = () => {
  try {
    serviceData.forEach((service) => {
      insertProduct(service);
    });

    const distinctCategories = [...new Set(serviceData.map((item) => item.category))];

    distinctCategories.forEach((category) => {
      // createNewTableByCategory(category, category);
    });
  } catch (error) {
    console.error('Error populating the database:', error);
  }
};

module.exports = {populateDatabase, insertProduct}
