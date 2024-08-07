import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";

const friends = [
  { username: "JohnDoe", pfp: "/path/to/john.jpg" },
  { username: "JaneSmith", pfp: "/path/to/jane.jpg" },
  // Add more friends here
];

const ChatDialog = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <IconButton
        color="inherit"
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1300, // Ensure it's on top of other elements
          backgroundColor: "#002147", // Match the theme color
          "&:hover": {
            backgroundColor: "#4b0082", // Change on hover
          },
        }}
      >
        <ChatIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            background: "linear-gradient(to right, #002147, #4b0082, #002147)",
            color: "white",
          },
        }}
      >
        <Box sx={{ padding: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            fullWidth
            sx={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
            }}
            value={search}
            onChange={handleSearchChange}
          />
          <List sx={{ marginTop: 2 }}>
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend, index) => (
                <React.Fragment key={index}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar alt={friend.username} src={friend.pfp} />
                    </ListItemAvatar>
                    <ListItemText primary={friend.username} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No friends found" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatDialog;
