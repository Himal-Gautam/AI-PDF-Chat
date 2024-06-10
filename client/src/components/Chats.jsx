import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import { useEffect, useRef } from "react";

const Chats = ({ messages }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      ref={chatContainerRef}
      sx={{
        flexGrow: 1, // This makes the Box take up the remaining space
        overflowY: "auto", // Makes the Box scrollable
        m: 5,
      }}
    >
      {messages.map((chat, index) => (
        <Box
          key={index}
          sx={{ display: "flex", gap: 2, width: "100%", textAlign: "left" }}
        >
          <Avatar
            sx={{ bgcolor: green }}
            src={chat.sender === "bot" ? "/robot.svg" : null} // Use null instead of empty string
          />
          <Typography
            sx={{ mb: 2, backgroundColor: "#f5f5f5", p: 2, borderRadius: 5 }}
            variant="body1"
          >
            {chat.message}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

Chats.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.oneOf(["bot", "user"]).isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Chats;
