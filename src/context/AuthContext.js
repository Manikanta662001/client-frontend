import React, { useContext, useState } from "react";
import { createContext } from "react";
import { BE_URL } from "../utils/Constants";
import { io } from "socket.io-client";


const socket = io(BE_URL);
const UserContext = createContext();
const AuthContext = ({ children }) => {
  const [mode, setMode] = useState("light");
  const [user, setUser] = useState({});
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [pageType, setPageType] = useState("login");
  const [roomId, setRoomId] = useState("");
  const allValues = {
    socket,
    mode,
    setMode,
    user,
    setUser,
    isLoggedin,
    setIsLoggedin,
    pageType,
    setPageType,
    roomId,
    setRoomId
  };
  return (
    <div>
      <UserContext.Provider value={allValues}>{children}</UserContext.Provider>
    </div>
  );
};

export default AuthContext;
export const useUserContext = () => useContext(UserContext);
