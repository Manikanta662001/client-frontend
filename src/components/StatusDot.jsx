import { Box } from "@mui/material";
import React from "react";

const StatusDot = ({ status }) => {
  return (
    <Box
      sx={{
        width: "10px",
        height: "10px",
        borderRadius: "100%",
        backgroundColor: status === "Online" ? "green" : "red",
        position: "absolute",
        right: 0,
        bottom: "2%",
      }}
    ></Box>
  );
};

export default StatusDot;
