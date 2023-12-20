const { createUserTable, createServiceProviderTable, createAdminTable } = require("./queries");
const { createOrdersTable } = require("./orders");
const { createMenuTable } = require("./product");
const { createCartTable } = require("./cart");
const { populateDatabase } = require("./services");
const { createComplaintsTable } = require('./complaints')
const createTables = () => {
  createUserTable();
  createServiceProviderTable();
  createAdminTable()
  createMenuTable();
  createCartTable();
  createOrdersTable();
  populateDatabase();
  createComplaintsTable();
};
createTables()
