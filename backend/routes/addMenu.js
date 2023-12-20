const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { insertMenu } = require("../database/services");
// const addProductRouter = express();
const addProductRouter = require("express").Router();
// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${Date.now()}${extname}`); // Generate a unique file name
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
addProductRouter.use(express.static("uploads"));

// Create a route to handle product creation
addProductRouter.post("/", upload.single("image"), async (req, res) => {
  // Handle the product data and image file
  try {
    const { name, category, price, quantity, addedBy } = req.body;
    const imagePath = req.file.path;

    // Save the product data and image path to your database
    // Here, we're just logging the data for demonstration purposes
    console.log("Product Name:", name);
    console.log("Category:", category);
    console.log("Price:", price);
    console.log("Quantity:", quantity);
    console.log("Image Path:", imagePath);
    let productData = {
      label: name,
      name: name,
      category: category,
      image: imagePath,
      cost: price,
      quantity: quantity,
      rating: Math.round(Math.random() * 5),
      addedBy: addedBy,
    };
    await insertMenu(productData);
    // Respond with a success message or other addProductRouterropriate response
    res.json({ message: "Product added successfully" });
  } catch (err) {
    console.log(err.message);
  }
});

addProductRouter.get("/", (req, res) => {
  res.send({ sd: "working" });
});

module.exports = addProductRouter;
