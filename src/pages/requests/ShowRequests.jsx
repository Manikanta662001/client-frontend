import React from "react";
import { Box, Button, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useUserContext } from "../../context/AuthContext";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import CssBaseline from "@mui/material/CssBaseline";
import { formatTime } from "../../utils/utils";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ShowRequests = ({
  allUsers,
  setAllUsers,
  showingUsers,
  setShowingUsers,
}) => {
  const [value, setValue] = React.useState(0);
  const { user, socket } = useUserContext();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const isPendingReuestsPresent = Object.keys(
    user?.pendingRequests || {}
  ).length;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleButtonClick = (type, id) => {
    socket.emit("changeRequestStatus", {
      type,
      userId: user._id,
      friendId: id,
    });
    // const updatedAllUsers = allUsers.filter((u) => {
    //   if (u._id !== user?._id) {
    //     return u;
    //   }
    // });
    // const updatedUsers = showingUsers.filter((u) => {
    //   if (u._id !== user?._id) {
    //     return u;
    //   }
    // });
    // setAllUsers(updatedAllUsers);
    // setShowingUsers(updatedUsers);
  };
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Pending Requests" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <CustomTabPanel
          value={value}
          index={0}
          style={{ "text-align": "left" }}
        >
          {isPendingReuestsPresent ? (
            <FlexBetween>
              {Object.entries(user?.pendingRequests).map((req) => {
                return (
                  <FlexBetween justifyContent={"space-around"} gap={"2rem"}>
                    <FlexBetween gap={"1rem"}>
                      <UserImage image={req?.[1].picturePath} size={"40px"} />
                      <Box>
                        <Typography
                          color={main}
                          variant="h5"
                          fontWeight={"500"}
                        >
                          <b>{req[1].name}</b> sent you Friend Request at{" "}
                          {formatTime(req[1].dateTime)}
                        </Typography>
                      </Box>
                    </FlexBetween>
                    <FlexBetween gap={"1rem"}>
                      <button
                        className="green-tick"
                        onClick={() => handleButtonClick("accept", req[0])}
                      >
                        ✔️
                      </button>
                      <button
                        className="red-tick"
                        onClick={() => handleButtonClick("reject", req[0])}
                      >
                        ❌
                      </button>
                    </FlexBetween>
                  </FlexBetween>
                );
              })}
            </FlexBetween>
          ) : (
            <>
              <Typography sx={{ textAlign: "center" }}>No Requests</Typography>
            </>
          )}
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default ShowRequests;
