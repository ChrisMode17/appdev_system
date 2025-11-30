import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userRole, setRole] = useState("");
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");
    if (storedUser && storedRole) {
      setUser(storedUser);
      setRole(storedRole);

      if (storedRole !== "Admin") {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setLogoutDialogOpen(false);
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          gap: 3,
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
          Welcome to the Admin Page
        </Typography>
        
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Username: {user}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Role: {userRole}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogoutClick}
          sx={{ mt: 3 }}
        >
          Logout
        </Button>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out? You will need to log in again to access your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" variant="contained" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin;