import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Thanks.css";

const Thanks = () => {
  const navigate = useNavigate();

  const routeToProducts = () => {
    navigate("/products");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      
      <Box className="greeting-container">
        <h2>Order Confirmed😃</h2>
        <Button
          variant="contained"
          size="large"
          id="continue-btn"
          onClick={routeToProducts}
        >
          Menu
        </Button>
      </Box>
    </>
  );
};

export default Thanks;
