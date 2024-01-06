import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signIn({ email, password });

        if (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
}

export default Login;
