import React, { useState } from "react";
import axios from "axios";
import { config } from "../../../App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function ProductForm() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    category: "none",
    price: 0,
    quantity: 1000,
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductData({ ...productData, image: imageFile });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the product data (including the image) to the server
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("price", productData.price);
    formData.append("quantity", productData.quantity);
    formData.append("image", productData.image);
    formData.append("addedBy", localStorage.getItem("username"));
    const url = `${config.endpoint}/addProduct`;
    axios.post(url, formData);
    Swal.fire({
      icon: "success",
      title: "Added!",
      text: ` data has been added.`,
      showConfirmButton: false,
      timer: 1500,
    });
    setProductData({
      name: "",
      category: "none",
      price: 0,
      quantity: 1000,
      image: null,
    });
    window.location.reload(false)
  };

  return (
    <div>
      <div className="small-container">
        <form onSubmit={handleSubmit}>
          <h1>Add New Product</h1>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <label htmlFor="name">Price</label>
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <br />
          <br />
          <input type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
