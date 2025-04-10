import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useUserContext } from "../../../context/AuthContext";
import FlexBetween from "../../../components/FlexBetween";
import { getFullName, getLastSeenTime } from "../../../utils/utils";
import UserImage from "../../../components/UserImage";

const ChatUserWidget = ({
  eachFriend,
  setSelectedChatUser,
  setSearchedUserText,
}) => {
  const { _id, firstName, lastName, picturePath, lastSeen } = eachFriend;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const neutralLight = palette.neutral.light;
  const { socket, roomId, user } = useUserContext();
  const count = user?.messageCount?.[_id] || 0;
  const handleSelectedUser = () => {
    setSelectedChatUser(eachFriend);
    setSearchedUserText("");
    socket.emit("clearMsgCount", {
      roomId,
      userId: user._id,
      friendId: _id,
    });
  };
  return (
    <FlexBetween
      sx={{
        "&:hover": { background: "lightGrey", cursor: "pointer" },
      }}
      padding={"10px"}
      borderBottom={`1px solid ${neutralLight}`}
      onClick={() => {
        handleSelectedUser();
      }}
    >
      <FlexBetween width={"100%"}>
        <FlexBetween gap={"1.5rem"}>
          <UserImage image={picturePath} size={"40px"} />
          <Box onClick={() => console.log("first")}>
            <Typography color={main} variant="h5" fontWeight={"500"}>
              {getFullName(eachFriend)}
            </Typography>
          </Box>
        </FlexBetween>
        <FlexBetween>
          <Box onClick={() => console.log("first")}>
            <Typography component={"h6"}>
              {getLastSeenTime(lastSeen)}
            </Typography>
            <Typography
              color={"white"}
              fontSize={"0.75rem"}
              textAlign={"center"}
            >
              {count > 0 && (
                <Typography
                  component={"span"}
                  sx={{ background: "green" }}
                  borderRadius={"40%"}
                  padding={"1px 3px"}
                >
                  {count}
                </Typography>
              )}
            </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>
    </FlexBetween>
  );
};

export default ChatUserWidget;
