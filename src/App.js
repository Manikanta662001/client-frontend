import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useEffect, useMemo, useRef } from "react";
import { useUserContext } from "./context/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Loginpage from "./pages/login/Loginpage";
import Homepage from "./pages/home/Homepage";
import ForgotPwd from "./pages/forgotPwd/ForgotPwd";
import LandingPage from "./pages/landingPage/LandingPage";
import { BE_URL } from "./utils/Constants";
import { getTokenFromCookie, notification } from "./utils/utils";

function App() {
  const { mode, setUser, setIsLoggedin } = useUserContext();
  console.log("MODE:::", mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const navigate = useNavigate();
  const hasFetched = useRef(false);
  const getUser = async () => {
    try {
      const response = await fetch(BE_URL + `/getUser`, {
        method: "GET",
        headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
      });
      const userData = await response.json();
      if (!response.ok) {
        throw new Error(userData.error);
      }
      if (userData) {
        setUser(userData);
        setIsLoggedin(true);
        navigate("/home");
      }
    } catch (error) {
      notification("", error.message);
    }
  };
  useEffect(() => {
    if (!hasFetched.current) {
      getUser();
      hasFetched.current = true;
    }
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/forgotPwd" element={<ForgotPwd />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
