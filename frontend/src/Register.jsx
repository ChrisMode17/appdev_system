import { useState } from "react";
import axios from "axios";
import {TextField, Button, Container, Typography, Paper, Box, Grid} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password || !role) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        { username, password, role },
        { headers: { "Content-Type": "application/json" } }
      );

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Paper
        elevation={10}
        style={{
          backgroundColor: "pink",
          padding: "40px",
          borderRadius: "15px",
          width: "100%",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{
            fontWeight: "600",
            color: "#2c3e50",
            marginBottom: "20px",
          }}
        >
          Create an Account
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2, 
          }}
        >
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{
              style: { fontSize: "14px" },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { fontSize: "14px" },
            }}
          />
          <TextField
            label="Role"
            fullWidth
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            InputLabelProps={{
              style: { fontSize: "14px" },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{
              height: "56px",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "16px",
              backgroundColor: "#1976d2",
            }}
            onClick={handleRegister}
          >
            Register
          </Button>
          <Button
            variant="text"
            color="secondary"
            fullWidth
            style={{
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "14px",
            }}
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;