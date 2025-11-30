import { useState } from "react";
import axios from "axios";
import {TextField, Button, Container, Typography, Paper, Box} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);

      // Check if it's the user's first time logging in
      const hasVisitedWelcome = localStorage.getItem(`hasVisitedWelcome_${response.data.username}`);
      
      alert("Login successful!");
      
      // Redirect to Welcome page if first time, otherwise to Dashboard
      if (!hasVisitedWelcome) {
        navigate("/welcome");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
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
        padding: "20px"
      }}
    >
      <Paper
        elevation={10}
        style={{
          backgroundColor: "pink",
          padding: "40px",
          borderRadius: "15px",
          width: "100%",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{
            fontWeight: "600",
            color: "#2c3e50",
            marginBottom: "20px"
          }}
        >
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleLogin}
          >
            Login
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
            onClick={() => navigate("/")}
          >
            Don't have an account yet? Register.
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;