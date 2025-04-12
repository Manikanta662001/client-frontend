import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import SendRequest from "./SendRequest";
import { ToastContainer } from "react-toastify";
import ShowRequests from "./ShowRequests";
import { useUserContext } from "../../context/AuthContext";

const Requestspage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [allUsers, setAllUsers] = useState([]);
  const [showingUsers, setShowingUsers] = useState([]);
  const { mode } = useUserContext();
  const theme = useTheme();
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
          <SendRequest
            allUsers={allUsers}
            setAllUsers={setAllUsers}
            showingUsers={showingUsers}
            setShowingUsers={setShowingUsers}
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "76%" : undefined}
          sx={{ background: mode === "light" ? "#e3e3d6" : "#404040" }}
        >
          <ShowRequests
            allUsers={allUsers}
            setAllUsers={setAllUsers}
            showingUsers={showingUsers}
            setShowingUsers={setShowingUsers}
          />
        </Box>
      </Box>
    </>
  );
};

export default Requestspage;
