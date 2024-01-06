import React, { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox';
import Orb from './components/Orb';
import Login from './components/login'; // Ensure correct path
import './App.css';
import { createClient } from '@supabase/supabase-js';
import { fetchMessages, updateMessageReadStatus } from './supabaseService'; // Import functions from service

const supabaseUrl = 'https://pwqsuhcfgytuixnhsvdu.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
    const [isTyping, setIsTyping] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [responseReady, setResponseReady] = useState(false);
    const [userId, setUserId] = useState(null);
    const [messages, setMessages] = useState([]); // State for storing messages
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch and set user session
        const session = supabase.auth.session();
        setUserId(session?.user?.id || null);
    
        // Real-time subscription to auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUserId(session?.user?.id || null);
        });

        // Fetch initial messages
        const loadMessages = async () => {
            const fetchedMessages = await fetchMessages();
            setMessages(fetchedMessages);
        };

        loadMessages();

        // Clean up subscription
        return () => {
            authListener.unsubscribe();
        };
    }, []);

    const handleUserTyping = () => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1000);
    };

    const handleSendMessage = async (message) => {
        setIsThinking(true);
        setError('');
        try {
            const { error, data } = await supabase.from('messages').insert([{ user_id: userId, message }]);
            if (error) throw error;
            // Add new message to local state
            setMessages([...messages, ...data]);
        } catch (error) {
            console.error('Error saving message:', error.message);
            setError('Failed to send message.');
        } finally {
            setIsThinking(false);
            setResponseReady(true);
            setTimeout(() => setResponseReady(false), 3000);
        }
    };

    // Function to mark a message as read
    const markMessageAsRead = async (messageId) => {
        await updateMessageReadStatus(messageId);
        setMessages(messages => messages.map(msg => 
            msg.id === messageId ? { ...msg, read: true } : msg
        ));
    };

    return (
        <div className="App">
            {error && <div className="error-message">{error}</div>}
            <Orb isTyping={isTyping} isThinking={isThinking} responseReady={responseReady} />
            <ChatBox 
                onUserTyping={handleUserTyping} 
                onSendMessage={handleSendMessage} 
                messages={messages}
                onMessageRead={markMessageAsRead}
                userId={userId} 
            />
        </div>
    );
}

export default App;
