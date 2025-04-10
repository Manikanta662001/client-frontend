import React from "react";
import "./LandingPage.scss";
import { Typography } from "@mui/material";

const LandingPage = () => {
  return (
    <div className="landing-page-wrapper">
      <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)">
        Welcome To Chat Application
      </Typography>
    </div>
  );
};

export default LandingPage;
