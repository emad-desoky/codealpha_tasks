import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Avatar,
  Button,
  InputBase,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { styled } from "@mui/material/styles";
import PostDialog from "./PostDialog";
import RegisterDialog from "./RegisterDialog";
import LoginDialog from "./LoginDialog";
import { useRouter } from "next/router";
import ProjectDialog from "./projectDialog";
import axios from "axios";

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

const sidebarVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};

export default function Sidebar({ setRefetch }) {
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [openRegistrationDialog, setOpenRegistrationDialog] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);

  const router = useRouter();

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
  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setProfilePicture(JSON.parse(storedUser).pfp);
    }
  }, []);

  const handleProfilePictureClick = () => {
    document.getElementById("profile-picture-upload").click();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  const handleSidebarToggle = (isVisible) => {
    setSidebarVisible(isVisible);
  };
  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");
    router.replace("/");

    setUser(null);
  };

  return (
    <div className="relative">
      {/* Sidebar */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 flex flex-col p-6 shadow-lg border-gray-700 ${
          isSidebarVisible ? "z-50" : "z-10"
        }`}
        variants={sidebarVariants}
        initial="hidden"
        animate={isSidebarVisible ? "visible" : "hidden"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseEnter={() => handleSidebarToggle(true)}
        onMouseLeave={() => handleSidebarToggle(false)}
      >
        {/* Header */}
        <Typography variant="h5" className="mb-4 font-semibold gradient-text">
          Project Tool Management
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
        {user && (
          <>
            <div className="mb-4">
              <Button
                variant="contained"
                className="w-full border-gradient bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
                startIcon={<AddIcon />}
                onClick={() => setOpenPostDialog(true)}
              >
                Create A Post
              </Button>
            </div>

            {/* Create Post Dialog */}
            <PostDialog
              loggedUser={user}
              openDialog={openPostDialog}
              handleCloseDialog={() => setOpenPostDialog(false)}
              setRefetch={setRefetch}
            />
          </>
        )}
        {/* Create Project Button */}
        {user && (
          <>
            <div className="mb-4">
              <Button
                variant="contained"
                className="w-full border-gradient bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
                startIcon={<AddIcon />}
                onClick={() => setOpenProjectDialog(true)}
              >
                Create A Project
              </Button>
            </div>

            {/* Create Project Dialog */}
            <ProjectDialog
              loggedUser={user}
              openDialog={openProjectDialog}
              handleCloseDialog={() => setOpenProjectDialog(false)}
              setRefetch={setRefetch}
            />
          </>
        )}

        {/* Login/Logout/Registration */}
        <div className="mb-4 flex flex-col gap-2">
          {user ? (
            <>
              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outlined"
                className="w-full border-gradient bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
                startIcon={<ExitToAppIcon />}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Login Button */}
              <Button
                className="w-full border-gradient bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
                variant="outlined"
                startIcon={<LoginIcon />}
                onClick={() => setOpenLoginDialog(true)}
              >
                Login
              </Button>

              {/* Login Dialog */}
              <LoginDialog
                openLoginDialog={openLoginDialog}
                handleCloseLoginDialog={() => setOpenLoginDialog(false)}
                setLoggedUser={setUser}
              />

              {/* Register Button */}
              <Button
                variant="outlined"
                className="w-full border-gradient bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
                startIcon={<PersonAddIcon />}
                onClick={() => setOpenRegistrationDialog(true)}
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Registration Dialog */}
        <RegisterDialog
          openRegistrationDialog={openRegistrationDialog}
          handleCloseRegistrationDialog={() => setOpenRegistrationDialog(false)}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarOpen={setSnackbarOpen}
        />

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
      </motion.div>

      {/* Sidebar Toggle Icon */}
      <div
        className={`fixed top-1/2 left-0 transform -translate-y-1/2 w-12 h-12 bg-gray-800 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-64" : ""
        }`}
        onMouseEnter={() => handleSidebarToggle(true)}
        onMouseLeave={() => handleSidebarToggle(false)}
      >
        <span className="text-xl">≡</span>
      </div>
    </div>
  );
}
