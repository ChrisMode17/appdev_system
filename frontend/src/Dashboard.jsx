import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "./images/profile.jpg";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Menu as MenuIcon,
  WaterDrop,
  WbSunny,
  Dashboard as DashboardIcon,
  ChevronRight,
  Thermostat,
  Bolt,
  MoreVert,
  AccessTime,
  Logout,
  Person,
  Folder,
} from "@mui/icons-material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setRole] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [basicInfoOpen, setBasicInfoOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#2196f3",
      },
      background: {
        default: darkMode ? "#000000" : "#ffffff",
        paper: darkMode ? "#000000" : "#ffffff",
      },
    },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");
    if (storedUser && storedRole) {
      setUser(storedUser);
      setUserEmail(`${storedUser.toLowerCase()}@example.com`);
      setRole(storedRole);

      if (storedRole !== "User") {
        navigate("/admin");
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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const sidebarWidth = 280;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          bgcolor: "background.default",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            bgcolor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => setSidebarOpen(!sidebarOpen)}
              sx={{ color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
            <WaterDrop sx={{ color: "#2196f3", fontSize: 28 }} />
          </Box>
          <IconButton onClick={toggleTheme} sx={{ color: "#2196f3" }}>
            <WbSunny />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Sidebar */}
          <Drawer
            variant="persistent"
            open={sidebarOpen}
            sx={{
              width: sidebarWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: sidebarWidth,
                boxSizing: "border-box",
                bgcolor: "#2c3e50",
                color: "#ffffff",
                borderRight: "none",
                pt: 1,
              },
            }}
          >
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              {/* Navigation Menu Items */}
              <Box sx={{ pt: 2, px: 1 }}>
                {/* Basic Information */}
                <Box>
                  <ListItemButton
                    onClick={() => setBasicInfoOpen(!basicInfoOpen)}
                    sx={{
                      color: "#ffffff",
                      "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                      mx: 1,
                      borderRadius: 1,
                      my: 0.5,
                      py: 1,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: "#ffffff" }}>
                      <Folder fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Basic Information"
                      primaryTypographyProps={{ fontSize: "14px", fontWeight: 500 }}
                    />
                    <ChevronRight 
                      sx={{ 
                        color: "#ffffff",
                        transform: basicInfoOpen ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }} 
                    />
                  </ListItemButton>
                  <Collapse in={basicInfoOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        sx={{
                          pl: 4,
                          color: "#ffffff",
                          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                          py: 0.75,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: "#ffffff" }}>
                          <WaterDrop fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="PH Level"
                          primaryTypographyProps={{ fontSize: "13px" }}
                        />
                      </ListItemButton>
                      <ListItemButton
                        sx={{
                          pl: 4,
                          color: "#ffffff",
                          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                          py: 0.75,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: "#ffffff" }}>
                          <Thermostat fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Temperature"
                          primaryTypographyProps={{ fontSize: "13px" }}
                        />
                      </ListItemButton>
                      <ListItemButton
                        sx={{
                          pl: 4,
                          color: "#ffffff",
                          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                          py: 0.75,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: "#ffffff" }}>
                          <Bolt fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Conductivity"
                          primaryTypographyProps={{ fontSize: "13px" }}
                        />
                      </ListItemButton>
                      <ListItemButton
                        sx={{
                          pl: 4,
                          color: "#ffffff",
                          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                          py: 0.75,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: "#ffffff" }}>
                          <MoreVert fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Turbidity"
                          primaryTypographyProps={{ fontSize: "13px" }}
                        />
                      </ListItemButton>
                      <ListItemButton
                        sx={{
                          pl: 4,
                          color: "#ffffff",
                          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                          py: 0.75,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: "#ffffff" }}>
                          <MoreVert fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Health Information"
                          primaryTypographyProps={{ fontSize: "13px" }}
                        />
                      </ListItemButton>
                      <ListItemButton
                        sx={{
                          pl: 4,
                          color: "#ffffff",
                          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                          py: 0.75,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40, color: "#ffffff" }}>
                          <MoreVert fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Water Information"
                          primaryTypographyProps={{ fontSize: "13px" }}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </Box>

                {/* Dashboard */}
                <ListItemButton
                  sx={{
                    bgcolor: "#1976d2",
                    color: "#ffffff",
                    "&:hover": { bgcolor: "#1565c0" },
                    mx: 1,
                    borderRadius: 1,
                    my: 0.5,
                    py: 1,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "#64b5f6" }}>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    primaryTypographyProps={{ fontSize: "14px", fontWeight: 500 }}
                  />
                </ListItemButton>

                {/* History */}
                <ListItemButton
                  sx={{
                    color: "#ffffff",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                    mx: 1,
                    borderRadius: 1,
                    my: 0.5,
                    py: 1,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "#ffffff" }}>
                    <AccessTime fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="History"
                    primaryTypographyProps={{ fontSize: "14px" }}
                  />
                </ListItemButton>

                {/* About */}
                <ListItemButton
                  sx={{
                    color: "#ffffff",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                    mx: 1,
                    borderRadius: 1,
                    my: 0.5,
                    py: 1,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "#ffffff" }}>
                    <MoreVert fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="About"
                    primaryTypographyProps={{ fontSize: "14px" }}
                  />
                </ListItemButton>
              </Box>

              {/* User Profile Section */}
              <Box
                sx={{
                  mt: "auto",
                  p: 2,
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                  }}
                >
                  <Avatar
                    src={profileImage}
                    alt="Profile"
                    sx={{
                      width: 40,
                      height: 40,
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 0.5 }}>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#ffffff",
                        lineHeight: 1.2,
                      }}
                    >
                      {user || "John Doe"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "rgba(255, 255, 255, 0.7)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {userEmail || "jd@example.com"}
                      </Typography>
                      <IconButton
                        onClick={handleLogoutClick}
                        sx={{
                          color: "#ffffff",
                          p: 0.5,
                          minWidth: "auto",
                          width: 24,
                          height: 24,
                          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                        }}
                      >
                        <Logout fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Drawer>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              bgcolor: "background.default",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                mb: 3,
                fontSize: "28px",
              }}
            >
              Dashboard
            </Typography>

            {/* Chart/Data Area */}
            <Box
              sx={{
                flex: 1,
                border: "1px solid",
                borderColor: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
                borderRadius: 1,
                bgcolor: darkMode ? "#000000" : "#ffffff",
                minHeight: "400px",
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
                  fontSize: "14px",
                }}
              >
                Chart/Data visualization area
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#64b5f6",
                  color: "#ffffff",
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: "13px",
                  letterSpacing: "0.5px",
                  "&:hover": {
                    bgcolor: "#42a5f5",
                  },
                }}
              >
                HEALTH INFO
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#64b5f6",
                  color: "#ffffff",
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: "13px",
                  letterSpacing: "0.5px",
                  "&:hover": {
                    bgcolor: "#42a5f5",
                  },
                }}
              >
                WATER INFO
              </Button>
            </Box>
          </Box>
        </Box>
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
    </ThemeProvider>
  );
};

export default Dashboard;