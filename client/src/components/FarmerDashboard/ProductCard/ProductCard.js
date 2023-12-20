import { useState, useEffect } from "react";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";
import {config} from "../../../App"

const ProductCard = ({ product, handleAddToCart }) => {
 
 
  return (
    <div>
      
   
    <Card className="card" variant="outlined" key={product._id} >
      <CardMedia className="cardImage" component="img" image={`${config.imageUrl}/${product.image}`} />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {product.label}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          color="text.primary"
        >
          ${product.cost}
        </Typography>
      </CardContent>
      {/* <CardContent>
        <Rating
          name="half-rating-read"
          defaultValue={product.rating}
          precision={0.5}
          readOnly
        />
      </CardContent> */}
      <CardActions>
        <Button
          className="card-button"
          fullWidth
          variant="contained"
          startIcon={<AddShoppingCartOutlined />}
          onClick={handleAddToCart}
          disabled={product.quantity<=0}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
    </div>
  );

};

export default ProductCard;
