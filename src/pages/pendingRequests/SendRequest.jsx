import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { Search } from "@mui/icons-material";
import { getAllUsers, getFullName } from "../../utils/utils";
import ChatUserWidget from "../home/chatSidebar/ChatUserWidget";
import ShowUsers from "./ShowUsers";
import { useUserContext } from "../../context/AuthContext";

const SendRequest = () => {
  const [searchedUser, setSearchedUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [showingUsers, setShowingUsers] = useState([]);
  const theme = useTheme();
  const { socket, user } = useUserContext();
  const neutralLight = theme.palette.neutral.light;
  const handleChange = (e) => {
    setSearchedUser(e.target.value);
    const filteredUsers = [...allUsers].filter((eachUser) =>
      getFullName(eachUser).toLowerCase().includes(e.target.value.toLowerCase())
    );
    setShowingUsers(filteredUsers);
  };
  useEffect(() => {
    const handleFetch = async () => {
      const result = await getAllUsers(searchedUser);
      const updatedUsers = result?.allUsers?.filter((u) => {
        if (u._id !== user?._id && !user?.friends?.includes(u._id)) {
          return u;
        }
      });
      console.log("ALL::::1", updatedUsers,result);
      setAllUsers(updatedUsers);
      setShowingUsers(updatedUsers);
    };
    handleFetch();
  }, []);
  console.log("ALL::::", allUsers, user);
  return (
    <Box padding={"8px 5px"} width={"100%"}>
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
      {showingUsers.length > 0 ? (
        showingUsers.map((singleUser, ind) => {
          return (
            <ShowUsers
              key={"sidebar" + singleUser.firstName}
              eachUser={singleUser}
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
