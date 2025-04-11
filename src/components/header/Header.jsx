import React, { useState } from "react";
import "./Header.scss";
import FlexBetween from "../FlexBetween";
import {
  Badge,
  Box,
  Button,
  IconButton,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close, DarkMode, LightMode, Menu } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { setCookie, updatedMode } from "../../utils/utils";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    mode,
    setMode,
    setPageType,
    isLoggedin,
    setIsLoggedin,
    user,
    setUser,
    socket,
  } = useUserContext();
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const handleBtnClick = (type) => {
    setPageType(type);
    navigate("/login");
  };
  const Logout = () => {
    socket.emit("changeStatus", {
      userId: user._id,
      status: "Offline",
    });
    setUser({});
    setIsLoggedin(false);
    setCookie("", 0);
    navigate("/login");
  };
  return (
    <FlexBetween
      padding="0.5rem 4%"
      backgroundColor={theme.palette.background.alt}
    >
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color="primary"
        onClick={() => navigate("/")}
        sx={{
          "&:hover": {
            color: theme.palette.primary.dark,
            cursor: "pointer",
          },
        }}
      >
        Chat App
      </Typography>
      {isNonMobileScreens ? (
        <FlexBetween gap={"0.7rem"}>
          <IconButton onClick={() => setMode(updatedMode(mode))}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode
                sx={{ color: theme.palette.primary.dark, fontSize: "25px" }}
              />
            )}
          </IconButton>
          {!isLoggedin && (
            <>
              <Button
                variant="contained"
                onClick={() => handleBtnClick("register")}
              >
                SignUp
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleBtnClick("login")}
              >
                SignIn
              </Button>
            </>
          )}
          {isLoggedin && (
            <FlexBetween gap={"1rem"}>
              <Button onClick={() => navigate("/requests")}>
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </Button>
              <Button variant="outlined" onClick={Logout}>
                Logout
              </Button>
            </FlexBetween>
          )}
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={theme.palette.background.default}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="0.7rem"
          >
            <IconButton
              onClick={() => setMode(updatedMode(mode))}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode
                  sx={{ color: theme.palette.primary.dark, fontSize: "25px" }}
                />
              )}
            </IconButton>
            {!isLoggedin && (
              <>
                <Button
                  variant="contained"
                  onClick={() => handleBtnClick("register")}
                >
                  SignUp
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleBtnClick("login")}
                >
                  SignIn
                </Button>
              </>
            )}
            {isLoggedin && (
              <FlexBetween
                gap={"1rem"}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Button onClick={() => navigate("/requests")}>
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </Button>
                <Button variant="outlined" onClick={Logout}>
                  Logout
                </Button>
              </FlexBetween>
            )}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Header;
