import React from "react";
import { Box } from "@mui/material";
import { BE_URL } from "../utils/Constants";
import StatusDot from "./StatusDot";

const UserImage = ({ image, size = "60px", showDot, status = "Offline" }) => {
  return (
    <Box width={size} height={size} position={"relative"}>
      <img
        width={size}
        height={size}
        style={{ objectFit: "cover", borderRadius: "50%" }}
        src={BE_URL + `/assets/${image}`}
        alt="user"
      />
      {showDot && <StatusDot status={status} />}
    </Box>
  );
};

export default UserImage;
