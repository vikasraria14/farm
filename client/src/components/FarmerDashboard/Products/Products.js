import { SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
 
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../../../App";
import "./Products.css";
import ProductCard from "../ProductCard/ProductCard";


const Products = () => {
  const [loader, setLoader] = useState(false);
  const [productData, setProductData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [success, setSuccess] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoad, setCartLoad] = useState(false);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const data = location.state?.category;

  const performAPICall = async () => {
    const url = `${config.endpoint}/products?category=`+data;
    setLoader(true);
    try {
      const response = await axios.get(url);
      const productData = response.data;

      setProductData(productData);
      // console.log(productData);
      setSuccess(true);
      setLoader(false);
      setCartLoad(true);

    } catch (e) {
      enqueueSnackbar(e.response.statusText, { variant: "error" });
      setLoader(false);
    }
  };
  
  
  const fetchCart = async (token) => {
    if (!token) return;
    const url = `${config.endpoint}/cart`
    try {
      const response = await axios.get(url,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const cartData = response.data;
        
      
        setCartItems(cartData)
        
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };
  useEffect(() => {
    performAPICall();
    fetchCart(token)
  }, []);
  
  

 
  const isItemInCart = (items, productId) => { 
    console.log(items, productId)
    if (items) {
      return items.findIndex((item) => item.menu_id === productId) !== -1
    }
  };
  

  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    category,
    quantity,
    options = { preventDuplicate: true }
  ) => {
    if (options.preventDuplicate && isItemInCart(items, productId)) {
      enqueueSnackbar(
        'Item already in cart. Use the cart to update quantity or remove item.',
        {
          variant: 'warning',
        },
      )
      return
    }
    
    try {
      const response = await axios.post(
        `${config.endpoint}/cart/add`,
        { productId, qty, category, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const cartData = response.data;
      enqueueSnackbar("Added to cart", { variant: "success" });
      setCartItems(cartData)
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

  
  return (
    <div>
      
    <br/>
     
      <Grid container mb={2}>
        <Grid item md={token ? 12 : 12}>
          
          {!loader ? (
            !success ? (
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className="loading"
              >
                <Box className="loading">
                  <SentimentDissatisfied color="action" />
                  <h4 style={{ color: "#636363" }}> No products found </h4>{" "}
                </Box>
              </Grid>
            ) : (
              <Box>
                <Grid container spacing={2}>
                  {productData.map((item) => (
                    <Grid item xs={6} md={3} key={item._id}>
                      <ProductCard product={item}  handleAddToCart={async () => {
                                           
                        await addToCart(
                          token,
                          cartItems,
                          productData,
                          item.id,
                          1,
                          item.category,
                          item.quantity,
                          {
                            preventDuplicate: true,
                          },
                          
                        )
                      }}/>
                      
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )
          ) : (
            <Box className="loading">
              <CircularProgress />
              <p>Loading Data...</p>
            </Box>
          )}
        </Grid>
        {/* {token && (
          <Grid
            item
            md={3}
            xs={12}
            style={{ backgroundColor: "#E9F5E1" }}
            mb={2}
          >
            <Cart
            hasCheckoutButton
            //products={productData}
            products={[]}
            items={cartItems}
            addToCart={addToCart}
            handleQuantity={handleQuantity}
            />
          </Grid>
        )} */}
      </Grid>

    </div>
  );
};

export default Products;
