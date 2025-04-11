import { useTheme } from "@emotion/react";
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import { Box, IconButton, Typography } from "@mui/material";
import { getFullName, notification } from "../../utils/utils";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useUserContext } from "../../context/AuthContext";

const ShowUsers = ({ eachUser }) => {
  const { _id, picturePath, status } = eachUser;
  const { palette } = useTheme();
  const { socket, user, setUser } = useUserContext();
  const main = palette.neutral.main;
  const neutralLight = palette.neutral.light;
  const handleAddIconClick = () => {
    socket.emit("sendRequest", {
      userId: user._id,
      userName:getFullName(eachUser),
      friendId: _id,
      friendName: getFullName(eachUser),
    });
    notification("Request Sent Successfully", "");
  };
  socket
    .off("receiveSendRequest")
    .on("receiveSendRequest", ({ updatedUser }) => {
      if (user._id === updatedUser._id) {
        setUser(updatedUser);
      }
    });
  return (
    <FlexBetween padding={"10px"} borderBottom={`1px solid ${neutralLight}`}>
      <FlexBetween width={"100%"}>
        <FlexBetween gap={"1.5rem"}>
          <UserImage
            image={picturePath}
            size={"40px"}
            showDot={true}
            status={status}
          />
          <Box>
            <Typography color={main} variant="h5" fontWeight={"500"}>
              {getFullName(eachUser)}
            </Typography>
          </Box>
        </FlexBetween>
        <FlexBetween>
          <IconButton onClick={handleAddIconClick} title="Add">
            {user.pendingRequests[_id] ? (
              <PersonRemoveIcon />
            ) : (
              <PersonAddAltIcon />
            )}
          </IconButton>
        </FlexBetween>
      </FlexBetween>
    </FlexBetween>
  );
};

export default ShowUsers;
