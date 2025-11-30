import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    
    if (!token || !username) {
      navigate("/login");
      return;
    }

    // If user has already visited Welcome, redirect to dashboard
    const hasVisitedWelcome = localStorage.getItem(`hasVisitedWelcome_${username}`);
    if (hasVisitedWelcome) {
      navigate("/dashboard");
      return;
    }

    // Redirect admin users to admin page
    if (role && role !== "User") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleStart = () => {
    // Mark that the user has visited the Welcome page
    const username = localStorage.getItem("username");
    if (username) {
      localStorage.setItem(`hasVisitedWelcome_${username}`, "true");
    }
    navigate("/dashboard");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Welcome
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            flex: "1 1 250px",
            maxWidth: 350,
            height: 200,
            padding: 2,
            borderRadius: 2,
            border: "1px solid",
            bgcolor: "error.main",
            color: "white",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: (theme) => theme.shadows[1],
            },
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
              PH Level
            </Typography>
            <Typography>
              Measures how acidic or basic the water is on a scale of 0–14. A pH
              of 7 is neutral.
            </Typography>
          </CardContent>
        </Card>

        <Card
          variant="outlined"
          sx={{
            flex: "1 1 250px",
            maxWidth: 350,
            height: 200,
            padding: 2,
            borderRadius: 2,
            border: "1px solid",
            bgcolor: "success.main",
            color: "white",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: (theme) => theme.shadows[1],
            },
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
              Temperature
            </Typography>
            <Typography>
              Indicates how hot or cold the water is, which affects water
              quality and aquatic life.
            </Typography>
          </CardContent>
        </Card>

        <Card
          variant="outlined"
          sx={{
            flex: "1 1 250px",
            maxWidth: 350,
            height: 200,
            padding: 2,
            borderRadius: 2,
            border: "1px solid",
            bgcolor: "secondary.main",
            color: "white",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: (theme) => theme.shadows[1],
            },
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
              Conductivity
            </Typography>
            <Typography>
              Shows how well water can conduct electricity, based on the amount
              of dissolved salts and minerals present.
            </Typography>
          </CardContent>
        </Card>
        <Card
          variant="outlined"
          sx={{
            flex: "1 1 250px",
            maxWidth: 350,
            height: 200,
            padding: 2,
            borderRadius: 2,
            border: "1px solid",
            bgcolor: "primary.main",
            color: "white",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: (theme) => theme.shadows[1],
            },
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
              Turbidity
            </Typography>
            <Typography>
              Measures how cloudy or clear the water is. High turbidity means
              more suspended particles like dirt or microbes.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Paper
        sx={{
          p: 3,
          mt: 3,
          borderRadius: 2,
          border: "1px solid",
          bgcolor: "success.light",
          color: "white",
        }}
        variant="outlined"
      >
        {/* Accordion Definition */}
        <Accordion sx={{ bgcolor: "success.light", color: "white", boxShadow: "none", }}>
          <AccordionSummary
            expandIcon={null}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Health Information
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography sx={{ color: "white" }}>
              Refers to data related to water safety and its impact on human
              health, such as contamination risks or exposure effects.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper
        sx={{
          p: 3,
          mt: 3,
          borderRadius: 2,
          border: "1px solid",
          bgcolor: "success.light",
          color: "white",
          boxShadow: "none",
        }}
        variant="outlined"
      >
        <Accordion sx={{ bgcolor: "success.light", color: "white", boxShadow: "none", }}>
          <AccordionSummary
            expandIcon={null}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Water Information
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography sx={{ color: "white" }}>
              General details about the water’s condition, including quality, 
              source, usage, and environmental factors.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Box
        sx={{ mt: 3, textAlign: { xs: "center", sm: "right", md: "right" } }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          sx={{
            width: { xs: "100%", md: 150 },
            fontSize: "1.1rem",
            padding: "10px 20px",
            fontWeight: "bold",
          }}
        >
          Start
        </Button>
      </Box>
    </Box>
  );
}

export default Welcome;