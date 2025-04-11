import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import SendRequest from "./SendRequest";
import { ToastContainer } from "react-toastify";

const PendingRequests = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <>
      <ToastContainer />
      <Box
        width="100%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box
          flexBasis={isNonMobileScreens ? "24%" : undefined}
          display={!isNonMobileScreens && "none"}
          height={"100vh"}
        >
          <SendRequest />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "76%" : undefined}
          sx={{ background: "#c9c9c1" }}
        ></Box>
      </Box>
    </>
  );
};

export default PendingRequests;
