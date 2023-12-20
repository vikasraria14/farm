const { connection } = require("./connection");

const getAdminList  = async (startDate, endDate) => {
  const sql = `
      SELECT name, username
      FROM dealer
      
    `;

  try {
    const result = await get(sql, []);
    console.log("Data fetched successfully!");
    return result;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

const getTopCategories = async (startDate, endDate) => {
  const sql = `
      SELECT category as name, SUM(price * quantity) AS total_order_price
      FROM orders
      
      GROUP BY category
      ORDER BY total_order_price DESC
      LIMIT 5
    `;

  try {
    const result = await get(sql, []);
    console.log("Data fetched successfully!");
    return result;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

const getTopServices = async () => {
  const sql = `
      SELECT label as name, SUM(price * quantity) AS total_order_price
      FROM orders
      
      GROUP BY label
      ORDER BY total_order_price DESC
      LIMIT 5
    `;

  try {
    const result = await get(sql, []);
    console.log("Data fetched successfully!");
    return result;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};
const getTopUsers = async () => {
  const sql = `
      SELECT username as name, SUM(price * quantity) AS total_order_price
      FROM orders
      
      GROUP BY username
      ORDER BY total_order_price DESC
      LIMIT 5
    `;

  try {
    const result = await get(sql, []);
    console.log("Data fetched successfully!");
    return result;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};
const getMostOrderedServices = async () => {
  const sql = `
      SELECT label as name, SUM(quantity) AS count
      FROM orders
      
      GROUP BY label
      ORDER BY count DESC
      LIMIT 5
    `;

  try {
    const result = await get(sql, []);
    console.log("Data fetched successfully!");
    return result;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

const fetchOrderQuantityByWeekday = async () => {
  const sql = `
  WITH ranked_orders AS (
    SELECT
      label AS foodItem,
      DAYOFWEEK(order_date) AS weekday,
      SUM(quantity) AS total_quantity,
      SUM(price) as total_cost,
      ROW_NUMBER() OVER (PARTITION BY DAYOFWEEK(order_date) ORDER BY SUM(quantity) DESC) AS rnk
    FROM
      orders
    WHERE
      order_status = 'new'
    GROUP BY
      label, -- Corrected from product_name
      weekday
  )
  SELECT
    foodItem as name,
    weekday,
    total_quantity as count
  FROM
    ranked_orders
  WHERE
    rnk = 1
  ORDER BY
    weekday;
`;

  try {
    const result = await get(sql, []);
    console.log("Data fetched successfully!", result);
    return result;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

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
module.exports = {
  getTopCategories,
  getTopServices,
  getTopUsers,
  getMostOrderedServices,
  fetchOrderQuantityByWeekday,
  getAdminList
};
