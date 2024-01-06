import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pwqsuhcfgytuixnhsvdu.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signIn = async (email, password) => {
    return await supabase.auth.signIn({ email, password });
};

export const signOut = async () => {
    return await supabase.auth.signOut();
};

export default supabase;
