import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import axios from "axios";
import { useState } from "react";

export default function RegisterDialog({
  openRegistrationDialog,
  handleCloseRegistrationDialog,
  setSnackbarMessage,
  setSnackbarOpen,
}) {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    age: "",
    email: "",
    country: "",
    pfp: "",
  });

  // Animation for Registration Dialog
  const registrationDialogProps = useSpring({
    opacity: openRegistrationDialog ? 1 : 0,
    transform: openRegistrationDialog ? "scale(1)" : "scale(0.95)",
    config: { tension: 300, friction: 30 },
  });

  const handleRegister = async () => {
    if (validateRegistrationData()) {
      axios
        .post("/api/users", registrationData)
        .then((res) => {
          if (res.data.message) {
            alert(res.data.message);
          } else {
            console.log("Registration successful: ", res.data);
            // Clear the registration form
            setRegistrationData({
              username: "",
              password: "",
              age: "",
              email: "",
              country: "",
              pfp: "",
            });

            handleCloseRegistrationDialog(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setSnackbarMessage("Failed to register. Please try again.");
          setSnackbarOpen(true);
        });
    }
  };

  const validateRegistrationData = () => {
    const { username, password, age, email, country, pfp } = registrationData;
    if (!username || !password || !age || !email || !country || !pfp) {
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

  return (
    <Dialog
      open={openRegistrationDialog}
      onClose={handleCloseRegistrationDialog}
      PaperProps={{
        sx: {
          backgroundColor: "#f9f9f9", // Light gray background
          borderRadius: "12px", // Rounded corners
          padding: "24px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <animated.div style={registrationDialogProps}>
        <DialogTitle
          sx={{
            backgroundColor: "#66b2ff", // Light blue background
            color: "#ffffff", // White text
            fontWeight: "bold",
            borderRadius: "12px 12px 12px 12px", // Rounded top corners
          }}
        >
          Register
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#f9f9f9", // Light gray background
            color: "#333333", // Dark text
            padding: "16px 24px", // Padding inside dialog content
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={registrationData.username}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                username: e.target.value,
              })
            }
            InputProps={{
              sx: { color: "#333333" }, // Dark text color for input
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={registrationData.password}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                password: e.target.value,
              })
            }
            InputProps={{
              sx: { color: "#333333" }, // Dark text color for input
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="age"
            label="Age"
            type="number"
            fullWidth
            variant="outlined"
            value={registrationData.age}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                age: e.target.value,
              })
            }
            InputProps={{
              sx: { color: "#333333" }, // Dark text color for input
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={registrationData.email}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                email: e.target.value,
              })
            }
            InputProps={{
              sx: { color: "#333333" }, // Dark text color for input
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="country"
            label="Country"
            type="text"
            fullWidth
            variant="outlined"
            value={registrationData.country}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                country: e.target.value,
              })
            }
            InputProps={{
              sx: { color: "#333333" }, // Dark text color for input
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="pfp"
            label="Profile Picture URL"
            type="text"
            fullWidth
            variant="outlined"
            value={registrationData.pfp}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                pfp: e.target.value,
              })
            }
            InputProps={{
              sx: { color: "#333333" }, // Dark text color for input
            }}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#f9f9f9", // Light gray background
            borderRadius: "0 0 12px 12px", // Rounded bottom corners
            padding: "16px 24px", // Padding inside dialog actions
          }}
        >
          <Button
            onClick={handleCloseRegistrationDialog}
            sx={{
              backgroundColor: "#6c757d", // Medium gray background for cancel
              color: "#ffffff", // White text
              "&:hover": {
                backgroundColor: "#5a6268", // Darker gray on hover
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRegister}
            sx={{
              backgroundColor: "#007bff", // Light blue for register
              color: "#ffffff", // White text
              "&:hover": {
                backgroundColor: "#0056b3", // Darker blue on hover
              },
            }}
          >
            Register
          </Button>
        </DialogActions>
      </animated.div>
    </Dialog>
  );
}
