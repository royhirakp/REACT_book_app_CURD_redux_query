import React from "react";

import { Typography } from "@mui/material";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ProductRate = ({ rate, count }: { rate: number; count: string }) => {
  return (
    <div
      className="flex"
      style={{
        width: "200px",
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Rating style={{ maxWidth: 90 }} value={rate} readOnly />
      <Typography>{count} reviews</Typography>
    </div>
  );
};

export default ProductRate;
