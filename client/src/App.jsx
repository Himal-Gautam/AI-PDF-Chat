import { useState } from "react";
import "./App.css";
import Chats from "./components/Chats";
import Messager from "./components/Messager";
import NavBar from "./components/NavBar";
import { Box } from "@mui/material";

function App() {
  const [messages, setMessages] = useState([
    
  ]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentPDF, setCurrentPDF] = useState(null);

  return (
    <>
      <Box
        sx={{
          height: "100vh", // Full viewport height
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NavBar
          currentPDF={currentPDF}
          setCurrentPDF={setCurrentPDF}
          setMessages={setMessages}
        />
        {/* Chat Area */}
        <Chats messages={messages} />
        {/* Message Input */}
        <Messager
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          messages={messages}
          setMessages={setMessages}
        />
      </Box>
    </>
  );
}

export default App;

{
  /* <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Type a message"
            fullWidth
            sx={{ mr: 2 }}
          />
          <Button variant="contained" color="primary">
            Send
          </Button>
        </Box> */
}

// {
//       sender: "bot",
//       message:
//         "Hello there! I hope you're having a wonderful day. How can I assist you today?",
//     },
//     {
//       sender: "user",
//       message:
//         "I'm doing alright, thank you! I just wanted to inquire about your products and services.",
//     },
//     {
//       sender: "bot",
//       message:
//         "Great to hear that! Our company offers a wide range of products and services tailored to your needs. Please feel free to ask any questions you may have.",
//     },
//     {
//       sender: "user",
//       message:
//         "That sounds fantastic! Could you provide more details about your pricing plans?",
//     },
//     {
//       sender: "bot",
//       message:
//         "Certainly! We have several pricing plans available, ranging from basic to premium, each offering different features and benefits. Would you like me to provide a detailed breakdown of each plan? Certainly! We have several pricing plans available, ranging from basic to premium, each offering different features and benefits. Would you like me to provide a detailed breakdown of each plan? Certainly! We have several pricing plans available, ranging from basic to premium, each offering different features and benefits. Would you like me to provide a detailed breakdown of each plan?",
//     },