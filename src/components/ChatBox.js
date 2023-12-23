import React, { useState } from 'react';
import './ChatBox.css'; // Make sure to create this CSS file

const ChatBox = () => {
    const [input, setInput] = useState(''); // State for the input field
    const [messages, setMessages] = useState([]); // State for storing messages

    // Function to handle sending a message
    const sendMessage = (event) => {
        event.preventDefault(); // Prevents the page from refreshing

        // Add logic here to send the input to the backend and get a response

        setMessages([...messages, input]); // Temporary: Adds input to chat history
        setInput(''); // Reset the input field after sending a message
    };

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p> // Display each message
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatBox;
