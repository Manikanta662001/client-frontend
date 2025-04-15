import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useEffect, useMemo, useRef } from "react";
import { useUserContext } from "./context/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Loginpage from "./pages/login/Loginpage";

import ForgotPwd from "./pages/forgotPwd/ForgotPwd";
import LandingPage from "./pages/landingPage/LandingPage";
import { BE_URL } from "./utils/Constants";
import { getTokenFromCookie, notification } from "./utils/utils";
import Requestspage from "./pages/requests/Requestspage";
import Chatpage from "./pages/chat/Chatpage";

function App() {
  const { mode, setUser, isLoggedin, setIsLoggedin } = useUserContext();
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
        navigate("/chat");
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
          <Route
            path="/"
            element={isLoggedin ? <Navigate to={"/chat"} /> : <LandingPage />}
          />
          <Route
            path="/login"
            element={isLoggedin ? <Navigate to={"/chat"} /> : <Loginpage />}
          />
          <Route
            path="/chat"
            element={isLoggedin ? <Chatpage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/requests"
            element={isLoggedin ? <Requestspage /> : <Navigate to={"/login"} />}
          />
          <Route path="/forgotPwd" element={<ForgotPwd />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
