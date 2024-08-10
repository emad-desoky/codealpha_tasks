import React, { useState, useEffect } from "react";
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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { useSpring, animated } from "@react-spring/web";
import CreatePostDialog from "./CreatePostDialog";
import { v4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/router";

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
  const [openRegistrationDialog, setOpenRegistrationDialog] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [settings, setSettings] = useState({
    deleteAccount: false,
    safety: false,
    aboutUs: false,
    privacyPolicy: false,
    termsOfService: false,
  });

  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    age: "",
    email: "",
    country: "",
    pfp: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenSettingsDialog = () => setOpenSettingsDialog(true);
  const handleCloseSettingsDialog = () => setOpenSettingsDialog(false);

  const handleCloseRegistrationDialog = () => setOpenRegistrationDialog(false);

  const handleCloseLoginDialog = () => setOpenLoginDialog(false);

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

  // Animation for Settings Dialog
  const settingsDialogProps = useSpring({
    opacity: openSettingsDialog ? 1 : 0,
    transform: openSettingsDialog ? "scale(1)" : "scale(0.9)",
    config: { tension: 300, friction: 30 },
  });

  // Animation for Registration Dialog
  const registrationDialogProps = useSpring({
    opacity: openRegistrationDialog ? 1 : 0,
    transform: openRegistrationDialog ? "scale(1)" : "scale(0.9)",
    config: { tension: 300, friction: 30 },
  });

  const validateRegistrationData = () => {
    const { username, password, age, email, country } = registrationData;
    if (!username || !password || !age || !email || !country) {
      setSnackbarMessage("All fields are required.");
      setSnackbarOpen(true);
      return false;
    }
    if (isNaN(age) || age <= 0) {
      setSnackbarMessage("Age must be a positive number.");
      setSnackbarOpen(true);
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (validateRegistrationData()) {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...registrationData,
            id: v4(), // Generating a unique ID
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Registration successful:", result);

        // Clear the registration form
        setRegistrationData({
          username: "",
          password: "",
          age: "",
          email: "",
          country: "",
        });

        handleCloseRegistrationDialog();
      } catch (error) {
        setSnackbarMessage("Failed to register. Please try again.");
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    // Assuming successful login+
    axios.post("api/login", user).then((res) => {
      if (!res.data.message) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } else {
        alert("invalid email or password");
      }
    });

    // Close the login dialog
    handleCloseLoginDialog();
  };

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");
    router.replace("/");

    setUser(null);
  };

  // The rest of your component's code...
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
          {user ? `Welcome, ${user.username}` : "Your Profile"}
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

      {/* Create Post Button */}
      {user ? (
        <>
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

          {/* Create Post Dialog */}
          <CreatePostDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
          />
        </>
      ) : (
        <></>
      )}

      {/* Login/Logout/Registration */}
      <div className="mb-4 flex flex-col gap-2">
        {user ? (
          <>
            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outlined"
              className="w-full"
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            {/* Login Button */}
            <Button
              variant="outlined"
              className="w-full"
              startIcon={<LoginIcon />}
              onClick={() => setOpenLoginDialog(true)}
            >
              Login
            </Button>

            {/* Login Dialog */}
            <Dialog
              open={openLoginDialog}
              onClose={() => setOpenLoginDialog(false)}
            >
              <DialogTitle>Login</DialogTitle>
              <DialogContent>
                <form onSubmit={handleLogin} className="flex flex-col gap-2">
                  <TextField
                    name="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </form>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpenLoginDialog(false)}
                  color="primary"
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            {/* Register Button */}
            <Button
              variant="outlined"
              className="w-full"
              startIcon={<PersonAddIcon />}
              onClick={() => setOpenRegistrationDialog(true)}
            >
              Register
            </Button>
          </>
        )}
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

      {/* Settings Dialog */}
      <Dialog open={openSettingsDialog} onClose={handleCloseSettingsDialog}>
        <animated.div style={settingsDialogProps}>
          <DialogTitle>Settings</DialogTitle>
          <StyledDialogContent>
            <List>
              {Object.keys(settings).map((setting) => (
                <StyledListItem key={setting}>
                  <ListItemText primary={setting} />
                </StyledListItem>
              ))}
            </List>
          </StyledDialogContent>
          <DialogActions>
            <Button onClick={handleCloseSettingsDialog}>Close</Button>
          </DialogActions>
        </animated.div>
      </Dialog>

      {/* Registration Dialog */}
      <Dialog
        open={openRegistrationDialog}
        onClose={handleCloseRegistrationDialog}
      >
        <animated.div style={registrationDialogProps}>
          <DialogTitle>Register</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              value={registrationData.username}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  username: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={registrationData.password}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  password: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="age"
              label="Age"
              type="number"
              fullWidth
              variant="standard"
              value={registrationData.age}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  age: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={registrationData.email}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  email: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="country"
              label="Country"
              type="text"
              fullWidth
              variant="standard"
              value={registrationData.country}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  country: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="pfp"
              label="Profile Picture URL"
              type="text"
              fullWidth
              variant="standard"
              value={registrationData.pfp}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  pfp: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRegistrationDialog}>Cancel</Button>
            <Button onClick={handleRegister}>Register</Button>
          </DialogActions>
        </animated.div>
      </Dialog>

      {/* Snackbar for Validation Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Sidebar;
