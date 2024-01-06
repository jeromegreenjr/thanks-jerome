import React from 'react';
import './Orb.css'; // Ensure you have this CSS file in the same directory

const Orb = ({ isTyping, isThinking, responseReady }) => {
    return (
        <div className={`orb ${isTyping ? 'typing' : ''} ${isThinking ? 'thinking' : ''} ${responseReady ? 'response-ready' : ''}`}></div>
    );
};

export default Orb;
