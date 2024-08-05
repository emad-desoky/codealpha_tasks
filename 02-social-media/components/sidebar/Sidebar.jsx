// components/Sidebar.jsx
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { useSpring, animated } from "@ui-aceternity";

// Styled Avatar for Click Effect
const ClickableAvatar = styled(Avatar)({
  position: "relative",
  cursor: "pointer",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  },
});

// Styled Dialog with Animation
const AnimatedDialog = ({ open, onClose, children }) => {
  const [animate, setAnimate] = useState(open);

  const props = useSpring({
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0)" : "translateY(-50px)",
    config: { duration: 300 },
    onRest: () => {
      if (!open) {
        setAnimate(false);
      }
    },
  });

  if (!animate && !open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { backgroundColor: "#333", color: "#fff" } }}
    >
      <animated.div style={props}>{children}</animated.div>
    </Dialog>
  );
};

const Sidebar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    "/path-to-your-profile-pic.jpg"
  );

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenSettingsDialog = () => setOpenSettingsDialog(true);
  const handleCloseSettingsDialog = () => setOpenSettingsDialog(false);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureClick = () => {
    document.getElementById("profile-picture-upload").click();
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 shadow-lg">
      {/* Header */}
      <Typography variant="h5" className="mb-4 font-semibold">
        CodeAlpha Social
      </Typography>

      {/* Profile Picture */}
      <div className="flex justify-center mb-4 relative">
        <ClickableAvatar
          alt="Profile Picture"
          src={profilePicture}
          sx={{ width: 96, height: 96 }}
          onClick={handleProfilePictureClick}
        />
        <input
          accept="image/*"
          id="profile-picture-upload"
          type="file"
          onChange={handleProfilePictureChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Profile Section */}
      <div className="mb-4">
        <Typography variant="body1" align="center">
          Your Profile
        </Typography>
      </div>

      {/* Search */}
      <div className="mb-4">
        <InputBase
          placeholder="Search..."
          fullWidth
          sx={{
            backgroundColor: "#333",
            borderRadius: 1,
            padding: "8px 16px",
            color: "#fff",
          }}
        />
      </div>

      {/* Notifications */}
      <div className="mb-4">
        <Tooltip title="Notifications">
          <IconButton
            className="w-full"
            color="inherit"
            onClick={() => console.log("Open Notifications")}
          >
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
      </div>

      {/* Create Post */}
      <div className="mb-4">
        <Button
          variant="contained"
          className="w-full flex items-center justify-center"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Create Post
        </Button>
      </div>

      {/* Login/Logout/Registration */}
      <div className="mb-4 flex flex-col gap-2">
        <Button variant="outlined" className="w-full" startIcon={<LoginIcon />}>
          Login
        </Button>
        <Button
          variant="outlined"
          className="w-full"
          startIcon={<PersonAddIcon />}
        >
          Register
        </Button>
        <Button
          variant="outlined"
          className="w-full"
          startIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
      </div>

      {/* Settings */}
      <div className="mt-auto">
        <Button
          variant="outlined"
          className="w-full"
          startIcon={<SettingsIcon />}
          onClick={handleOpenSettingsDialog}
        >
          Settings
        </Button>
      </div>

      {/* Create Post Dialog */}
      <AnimatedDialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create a Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Post Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="content"
            label="Post Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              // Handle Post Creation Logic
              handleCloseDialog();
            }}
          >
            Post
          </Button>
        </DialogActions>
      </AnimatedDialog>

      {/* Settings Dialog */}
      <AnimatedDialog
        open={openSettingsDialog}
        onClose={handleCloseSettingsDialog}
      >
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <List>
            <ListItem button>
              <ListItemText primary="Delete Account" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Safety" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="About Us" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Privacy Policy" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Terms of Service" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSettingsDialog}>Close</Button>
        </DialogActions>
      </AnimatedDialog>
    </div>
  );
};

export default Sidebar;
