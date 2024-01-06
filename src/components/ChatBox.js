import React, { useState, useEffect } from 'react';
import './ChatBox.css';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ChatBox = ({ onUserTyping, userId }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch initial messages and set up a real-time subscription
        const fetchInitialMessages = async () => {
            const { data: initialMessages, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) {
                console.error('Error fetching messages:', error);
            } else {
                setMessages(initialMessages);
            }
        };

        fetchInitialMessages();

        const subscription = supabase
            .from('messages')
            .on('INSERT', (response) => {
                setMessages((prevMessages) => [response.new, ...prevMessages]);
            })
            .subscribe();

        return () => {
            supabase.removeSubscription(subscription);
        };
    }, []);

    // ... rest of the ChatBox component
};

export default ChatBox;
