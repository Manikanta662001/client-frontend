import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { Search } from "@mui/icons-material";
import { getAllUsers, getFullName } from "../../utils/utils";
import ChatUserWidget from "../chat/chatSidebar/ChatUserWidget";
import ShowUsers from "./ShowUsers";
import { useUserContext } from "../../context/AuthContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const SendRequest = ({
  allUsers,
  setAllUsers,
  showingUsers,
  setShowingUsers,
}) => {
  const [searchedUser, setSearchedUser] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  const { socket, user } = useUserContext();
  const neutralLight = theme.palette.neutral.light;
  const handleChange = (e) => {
    setSearchedUser(e.target.value);
    const filteredUsers = [...allUsers].filter((eachUser) =>
      getFullName(eachUser).toLowerCase().includes(e.target.value.toLowerCase())
    );
    setShowingUsers(filteredUsers);
  };
  const handleRemoveUser = (updatedUser, updatedToUser) => {
    if (updatedUser._id === user._id) {
      const filteredAllUsers = [...allUsers].filter(
        (u) => u._id !== updatedToUser._id
      );
      const filteredShowingUsers = [...showingUsers].filter(
        (u) => u._id !== updatedToUser._id
      );
      setAllUsers(filteredAllUsers);
      setShowingUsers(filteredShowingUsers);
    } else if (updatedToUser._id === user._id) {
      const filteredAllUsers = [...allUsers].filter(
        (u) => u._id !== updatedUser._id
      );
      const filteredShowingUsers = [...showingUsers].filter(
        (u) => u._id !== updatedUser._id
      );
      setAllUsers(filteredAllUsers);
      setShowingUsers(filteredShowingUsers);
    }
  };
  useEffect(() => {
    const handleFetch = async () => {
      const result = await getAllUsers(searchedUser);
      const updatedUsers = result?.allUsers?.filter((u) => {
        if (u._id !== user?._id && !user?.friends?.includes(u._id)) {
          return u;
        }
      });
      console.log("ALL::::1", updatedUsers, result);
      setAllUsers(updatedUsers);
      setShowingUsers(updatedUsers);
    };
    handleFetch();
  }, []);
  console.log("ALL::::", allUsers, user);
  return (
    <Box padding={"8px 5px"} width={"100%"}>
      <FlexBetween>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </IconButton>
        <FlexBetween
          backgroundColor={neutralLight}
          borderRadius="9px"
          gap="2rem"
          padding="0.1rem 1.5rem"
        >
          <IconButton>
            <Search />
          </IconButton>
          <InputBase
            placeholder="Search..."
            fullWidth
            value={searchedUser}
            onChange={handleChange}
          />
        </FlexBetween>
      </FlexBetween>
      {showingUsers.length > 0 ? (
        showingUsers.map((singleUser, ind) => {
          return (
            <ShowUsers
              key={"sidebar" + singleUser.firstName}
              eachUser={singleUser}
              handleRemoveUser={handleRemoveUser}
            />
          );
        })
      ) : (
        <p style={{ margin: "auto" }}>No Users Found</p>
      )}
    </Box>
  );
};

export default SendRequest;
