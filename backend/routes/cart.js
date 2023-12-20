var express = require("express");
var router = express.Router();
const { handleError, verifyAuth, getProduct } = require("../utils");
var { users, products } = require("../db");
const {insertOrder} = require('../database/orders')
const {decreaseMenuQuantity}= require("../database/product")
const { addToCart, getCartByUsername , updateCartMenuQuantity, deleteCartItem, deleteCartByUser} = require("../database/cart");
const { nanoid } = require("nanoid");

// Cart Controller
router.get("/", verifyAuth, async (req, res) => {
  console.log(`GET request to "/cart" received`);
  try {
    let x = await getCartByUsername(req.user.username);
    return res.status(200).json(x);
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/", verifyAuth, async (req, res) => {
  console.log(`POST request to "/cart" received`, req.body);
  try {
    if (req.body.qty === 0) {
      await deleteCartItem(req.body.productId);
    } else if (req.body.qty > 3) {
      return res.status(400).json({ success: false, message: "Max 3 items allowed" });
    } else {
      await updateCartMenuQuantity(req.body.productId, req.body.qty);
    }
    let x = await getCartByUsername(req.user.username);
    return res.status(200).json(x);
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/add", verifyAuth, async (req, res) => {
  console.log(
    `POST request received to "/cart/add": ${req.user.username}, `,
    req.body
  );
  try {
    let x = await getCartByUsername(req.user.username);
    let found = x.find((x1) => {
      return req.body.productId === x1.product_id;
    });

    if (found) {
      return res.status(400).json({ success: false, message: "Item already in cart" });
    }
    console.log(req.body)
    await addToCart(req.user.username, req.body.productId, req.body.qty, req.body.category);
    x = await getCartByUsername(req.user.username);
    return res.status(200).json(x);
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/checkout", verifyAuth, async (req, res) => {
  console.log(`POST request received to "/cart/checkout": ${req.user.username}`);
  try {
    let total = 0;
    req.user.cart = await getCartByUsername(req.user.username);
    for (let element of req.user.cart) {
      total = total + element.quantity * element.price;
    }

    let cart = req.user.cart;
    console.log(cart,"cart")
    
    if (total === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    

    let id = nanoid();
    
    await deleteCartByUser(req.user.username);
    cart.map((cart1,i) => {
      insertOrder(id+i, req.user.username, cart1.product_name, cart1.price, cart1.quantity, cart1.label, cart1.category);
      decreaseMenuQuantity(cart1.product_id, cart1.quantity)
    });

    req.user.balance -= total;
    console.log("Mock order placed");
    console.log("Total cost", total);

    users.update({ _id: req.user._id }, req.user, {}, (err) => {
      if (err) {
        handleError(res, err);
      }
      return res.status(200).json({ success: true });
    });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
