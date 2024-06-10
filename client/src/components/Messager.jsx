import React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";

function Messager({ messages, setMessages, isDisabled, setIsDisabled }) {
  const [prompt, setPrompt] = React.useState("");

  const sendMessage = async () => {
    if (!prompt) return; // Do not send empty messages
    setIsDisabled(true); // Disable input while sending

    try {
      // Add user message to messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", message: prompt },
      ]);
      setPrompt(""); // Clear input
      // Simulate sending the message to the backend (replace with actual API call)
      // Assuming backend returns message object { sender: "bot", message: responseMessage }
      const response = await sendMessageToBackend(prompt);
      // Add response message to messages array
      // setMessages((prevMessages) => [...prevMessages, response.data]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", message: "Hi I am robot" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error (e.g., show error message)
    } finally {
      setIsDisabled(false); // Enable input after sending
    }
  };

  const sendMessageToBackend = async (message) => {
    // Simulate sending the message to the backend (replace with actual API call)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ sender: "bot", message: "Response from backend" });
      }, 1000); // Simulate delay
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <OutlinedInput
      type="text"
      sx={{ maxWidth: "100%", m: 5, boxShadow: 5 }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={sendMessage} edge="end" disabled={isDisabled}>
            <SendIcon />
          </IconButton>
        </InputAdornment>
      }
      placeholder="Send a message ..."
      onChange={(e) => {
        setPrompt(e.target.value);
      }}
      value={prompt}
      disabled={isDisabled}
      onKeyPress={handleKeyPress}
    />
  );
}

Messager.propTypes = {
  messages: PropTypes.array.isRequired,
  setMessages: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  setIsDisabled: PropTypes.func.isRequired,
};

export default Messager;
