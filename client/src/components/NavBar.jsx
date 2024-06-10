import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useMediaQuery } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

const NavBar = ({ setMessages, setCurrentPDF, currentPDF }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setMessages([]);
      // Simulate uploading to the backend (replace with actual API call)
      const response = await uploadToBackend(file);
      setCurrentPDF(response.data); // Assuming backend returns file details
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error (e.g., show error message)
    } finally {
      setUploading(false);
    }
  };

  const uploadToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // Replace 'uploadEndpoint' with your actual backend API endpoint
    return axios.post("uploadEndpoint", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "white", color: "black" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI PDF Chat
          </Typography>
          {currentPDF && (
            <Button
              startIcon={<InsertDriveFileOutlinedIcon />}
              disabled={true}
              sx={{
                mr: 2,
                "&:disabled": {
                  color: "blue",
                  bgcolor: "#ffffff", // Hover background color
                },
              }}
            >
              {currentPDF.name}
            </Button>
          )}
          <Button
            variant="outlined"
            component="label"
            role={undefined}
            disabled={uploading}
          >
            <AddCircleOutlineIcon />
            {!isSmallScreen && (
              <Typography sx={{ ml: 1 }}>Upload PDF</Typography>
            )}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

NavBar.propTypes = {
  setMessages: PropTypes.func.isRequired,
  setCurrentPDF: PropTypes.func.isRequired,
  currentPDF: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default NavBar;
