import { useTheme } from "@emotion/react";
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import { Box, IconButton, Typography } from "@mui/material";
import { getFullName, notification } from "../../utils/utils";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useUserContext } from "../../context/AuthContext";

const ShowUsers = ({ eachUser, handleRemoveUser }) => {
  const { _id, picturePath, status } = eachUser;
  const { palette } = useTheme();
  const { socket, user, setUser } = useUserContext();
  const main = palette.neutral.main;
  const neutralLight = palette.neutral.light;
  const handleAddIconClick = () => {
    socket.emit("sendRequest", {
      userId: user._id,
      userName: getFullName(user),
      userImage: user.picturePath,
      friendId: _id,
      friendName: getFullName(eachUser),
      friendImage: eachUser.picturePath,
    });
    notification("Request Sent Successfully", "");
  };
  socket
    .off("receiveSendRequest")
    .on(
      "receiveSendRequest",
      ({ updatedUser, updatedToUser, message = "", type }) => {
        if (user._id === updatedUser._id) {
          setUser(updatedUser);
          message && notification("", "", message);
        } else if (user._id === updatedToUser._id) {
          setUser(updatedToUser);
        }
        if (message === "" && type === "accept") {
          handleRemoveUser(updatedUser, updatedToUser);
        }
      }
    );
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
            {user.sendingRequests[_id] ? (
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
