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
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { useSpring, animated } from "@react-spring/web";

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

// Styled Dialog for Settings
const StyledDialogContent = styled(DialogContent)({
  backgroundColor: "#f5f5f5",
  padding: "24px",
});

const StyledListItem = styled(ListItem)({
  borderRadius: "8px",
  marginBottom: "8px",
  backgroundColor: "#ffffff",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
});

const Sidebar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    "/path-to-your-profile-pic.jpg"
  );
  const [postContent, setPostContent] = useState("");
  const [settings, setSettings] = useState({
    deleteAccount: false,
    safety: false,
    aboutUs: false,
    privacyPolicy: false,
    termsOfService: false,
  });

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

  // Animation for Create Post Dialog
  const dialogProps = useSpring({
    opacity: openDialog ? 1 : 0,
    transform: openDialog ? "scale(1)" : "scale(0.9)",
    config: { tension: 300, friction: 30 },
  });

  // Animation for Settings Dialog
  const settingsDialogProps = useSpring({
    opacity: openSettingsDialog ? 1 : 0,
    transform: openSettingsDialog ? "scale(1)" : "scale(0.9)",
    config: { tension: 300, friction: 30 },
  });

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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <animated.div style={dialogProps}>
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
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              inputProps={{ maxLength: 500 }}
              helperText={`${postContent.length}/500 characters`}
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
        </animated.div>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog
        open={openSettingsDialog}
        onClose={handleCloseSettingsDialog}
        maxWidth="md"
        fullWidth
      >
        <animated.div style={settingsDialogProps}>
          <DialogTitle>Settings</DialogTitle>
          <StyledDialogContent>
            <List>
              {Object.keys(settings).map((key) => (
                <StyledListItem
                  button
                  key={key}
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                >
                  <ListItemText
                    primary={key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: settings[key] ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {settings[key] ? "Enabled" : "Disabled"}
                  </Typography>
                </StyledListItem>
              ))}
            </List>
          </StyledDialogContent>
          <DialogActions>
            <Button onClick={handleCloseSettingsDialog}>Close</Button>
          </DialogActions>
        </animated.div>
      </Dialog>
    </div>
  );
};

export default Sidebar;
