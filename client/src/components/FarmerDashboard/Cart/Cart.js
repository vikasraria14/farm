import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { config } from "../../../App";
import axios from "axios";
import { useSnackbar } from "notistack";
import {useState, useEffect} from 'react'
import Swal from "sweetalert2";





export const getTotalItems = (items = []) => {
  if (!items.length) return 0;
  const total = items.map((item) => item.qty).reduce((total, n) => total + n);
  return total;
};
const token = localStorage.getItem("token");

const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
  isReadOnly
}) => {
  if (isReadOnly) {
    return <Box>Qty: {value}</Box>;
  }
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};


const Cart = ({
  // products,
  items = [],
  // handleQuantity,
  hasCheckoutButton = true,
  isReadOnly = false,
  
}) => {
  const [products, setProducts] = useState([])
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const getTotalCartValue = (items = []) => {
    let total = 0;
    if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        total += products[i].price * products[i].quantity;
      }
    }
    return total;
  };

  const handleQuantity = async (
    token,
    items,
    products,
    productId,
    qty,
    item,
    options = { preventDuplicate: false }
  ) => {
    
    if (!token) {
      enqueueSnackbar('Login to add an item to the Cart', {
        variant: 'warning',
      })
      return
    }
    
    if (options.preventDuplicate) {
      enqueueSnackbar(
        'Item already in cart. Use the cart sidebar to update quantity or remove item.',
        {
          variant: 'warning',
        },
      )
      return
    }
    try {
      let productQuantity = await axios.get(
        `${config.endpoint}/products/getProductById?id=${item.menu_id}`,
        { productId, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      // console.log(productQuantity.data, qty, item.productId, item)
      if(productQuantity?.data[0])
      {
        console.log("quantity", qty,productQuantity?.data[0]?.quantity)
        if(qty>productQuantity?.data[0]?.quantity)
        {
          enqueueSnackbar(`only ${productQuantity?.data[0]?.quantity} left in stock`, {
            variant: 'warning',
          })
          return
        }

      }
      const response = await axios.post(
        `${config.endpoint}/cart`,
        { productId, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const cartData = response.data;
     
      setProducts(cartData)

    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: 'error' })
      } else {
        enqueueSnackbar(
          'Could not fetch products. Check that the backend is running, reachable and returns valid JSON.',
          {
            variant: 'error',
          },
        )
      }
    }
  }

  const fetchData = async()=>{
    const response = await axios.get(
      `${config.endpoint}/cart`,
      // { productId, qty, category, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const cartData = response.data;
    
    setProducts(cartData)
  }
  useEffect(() => {
   fetchData()
  }, [])
  
  if (!products.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  const performCheckout = async (token, items) => {
    try {
      await axios
        .post(
          `${config.endpoint}/cart/checkout`,
          { },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          enqueueSnackbar("checkout Successfull", { variant: "success" });
          Swal.fire({
            icon: "success",
            title: "checkout Successfull",
            text: ` order has been placed`,
            showConfirmButton: true,
            timer: 2500,
          });
          navigate("/complaints");
          return true;
        });
    } catch (e) {}
  
  return false;
};

  return (
    <>
      <Box className="cart"  >
      
        {products.map((item,i) => (
        <Box display="flex" alignItems="flex-start" padding="1rem">
          {console.log(item)}
          <Box className="image-container">
            <img
              // Add product image
              
              src={`${config.imageUrl}/${item.image}`}
              // Add product name as alt eext
              alt={item.label}
              width="100%"
              height="100%"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="6rem"
            paddingX="1rem"
          >
            <div>{item.label}</div>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <ItemQuantity
              value={item.quantity}
              handleAdd={() =>handleQuantity(
                token,
                items,
                products,
                item.id,
                item.quantity + 1,
                item
              )}
              handleDelete={() =>handleQuantity(
                  token,
                  items,
                  products,
                  item.id,
                  item.quantity - 1,
                  item
                )}
              isReadOnly={isReadOnly}
              />
              <Box padding="0.5rem" fontWeight="700">
              ${item.price}
              </Box>
            </Box>
          </Box>
        </Box>))}

        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>
        {hasCheckoutButton  && (
        <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
            onClick={() => performCheckout(token,items)}
          >
            Checkout
          </Button>
        </Box>)}
      </Box>
      {isReadOnly && (
        <Box className="cart" padding="1rem">
          <h2>Order Details</h2>
         
          <Box className="cart-row">
            <p>Subtotal</p>
            <p>${getTotalCartValue(items)}</p>
          </Box>
          <Box className="cart-row">
            <p>Shipping Charges</p>
            <p>$0</p>
          </Box>
          <Box className="cart-row" fontSize="1.25rem" fontWeight="700">
            <p>Total</p>
            <p>${getTotalCartValue(items)}</p>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cart;
